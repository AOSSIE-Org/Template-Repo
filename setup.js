#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const FILES_TO_PROCESS = ['README.md', 'CONTRIBUTING.md'];
const isDryRun = process.argv.includes('--dry-run');

const log = {
    info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
    success: (msg) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`),
    warning: (msg) => console.log(`\x1b[33m[WARNING]\x1b[0m ${msg}`),
    error: (msg) => console.log(`\x1b[31m[ERROR]\x1b[0m ${msg}`)
};

const promptUser = (question) => {
    return new Promise((resolve) => {
        const ask = () => {
            rl.question(`\x1b[36m?\x1b[0m ${question}: `, (answer) => {
                const trimmed = answer.trim();
                if (trimmed) {
                    resolve(trimmed);
                } else {
                    log.error('Input cannot be empty. Please try again.');
                    ask();
                }
            });
        };
        ask();
    });
};

const confirmAction = (question) => {
    return new Promise((resolve) => {
        const ask = () => {
            rl.question(`\x1b[36m?\x1b[0m ${question} (y/n): `, (answer) => {
                const trimmed = answer.trim().toLowerCase();
                if (trimmed === 'y' || trimmed === 'n') {
                    resolve(trimmed === 'y');
                } else {
                    log.error('Invalid input. Please enter "y" or "n".');
                    ask();
                }
            });
        };
        ask();
    });
};

const hasPlaceholders = (content) => {
    return /TODO:\s*Project\s*Name/gi.test(content) ||
        /TODO:\s*Project\s*Description/gi.test(content);
};

const replacePlaceholders = (content, data) => {
    let newContent = content;
    newContent = newContent.replace(/TODO:\s*Project\s*Name/gi, data.projectName);
    newContent = newContent.replace(/TODO:\s*Project\s*Description/gi, data.projectDescription);
    return newContent;
};

const processFile = (filePath, data) => {
    const absolutePath = path.join(process.cwd(), filePath);

    if (!fs.existsSync(absolutePath)) {
        log.warning(`File not found, skipping: ${filePath}`);
        return false;
    }

    try {
        const content = fs.readFileSync(absolutePath, 'utf8');

        if (!hasPlaceholders(content)) {
            log.info('File already initialized, skipping');
            return false;
        }

        const newContent = replacePlaceholders(content, data);

        if (content !== newContent) {
            if (!isDryRun) {
                fs.writeFileSync(`${absolutePath}.bak`, content, 'utf8');
                log.info(`Created backup: ${filePath}.bak`);
                fs.writeFileSync(absolutePath, newContent, 'utf8');
            }
            return true;
        }
        return false;
    } catch (error) {
        log.error(`Failed to process ${filePath}: ${error.message}`);
        return false;
    }
};

const validateCompletion = () => {
    let hasRemainingTodos = false;

    FILES_TO_PROCESS.forEach((filePath) => {
        const absolutePath = path.join(process.cwd(), filePath);
        if (!fs.existsSync(absolutePath)) return;

        try {
            const content = fs.readFileSync(absolutePath, 'utf8');
            if (hasPlaceholders(content)) {
                log.warning(`Remaining placeholder found in ${filePath}`);
                hasRemainingTodos = true;
            }
        } catch (error) {
            log.error(`Failed to validate ${filePath}: ${error.message}`);
            hasRemainingTodos = true;
        }
    });

    if (!hasRemainingTodos) {
        log.success('No remaining TODOs detected in processed files.');
    }

    return !hasRemainingTodos;
};

const main = async () => {
    try {
        log.info('Template Initialization System Started');
        if (isDryRun) {
            log.info('Running in DRY RUN mode. No files will be modified.');
        }

        const projectName = await promptUser('Enter project name');
        const projectDescription = await promptUser('Enter project description');

        let techStack;
        while (true) {
            techStack = (await promptUser('Enter tech stack (node/python)')).toLowerCase();
            if (techStack === 'node' || techStack === 'python') break;
            log.error('Invalid choice. Please enter either "node" or "python".');
        }

        const data = { projectName, projectDescription, techStack };

        log.info('--- SUMMARY OF CHANGES ---');
        log.info(`Project Name        : ${data.projectName}`);
        log.info(`Project Description : ${data.projectDescription}`);
        log.info(`Tech Stack          : ${data.techStack}`);
        log.info(`Target Files        : ${FILES_TO_PROCESS.join(', ')}`);

        const proceed = await confirmAction('Proceed with these changes?');
        if (!proceed) {
            log.info('Operation cancelled by user.');
            rl.close();
            process.exit(0);
        }

        let modifiedCount = 0;
        FILES_TO_PROCESS.forEach((file) => {
            if (processFile(file, data)) {
                log.success(`${isDryRun ? '[DRY RUN] ' : ''}Successfully updated: ${file}`);
                modifiedCount++;
            }
        });

        if (modifiedCount === 0) {
            log.info('No files required modifications.');
        } else {
            if (data.techStack === 'node') {
                log.info('Node.js stack selected. Run "npm install" to configure dependencies.');
            } else {
                log.info('Python stack selected. Run "pip install -r requirements.txt" to configure dependencies.');
            }
        }

        const isSuccess = validateCompletion();

        if (isSuccess) {
            log.success('Initialization complete!');
            rl.close();
            process.exit(0);
        } else {
            log.error('Initialization completed with warnings.');
            rl.close();
            process.exit(1);
        }
    } catch (error) {
        log.error(`An unexpected error occurred: ${error.message}`);
        rl.close();
        process.exit(1);
    }
};

main();