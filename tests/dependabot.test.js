import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { validateDependabot } from '../scripts/validate-dependabot.js';

// Helper to write temporary config
function writeConfig(content) {
  const file = path.join(process.cwd(), '.github', 'dependabot.yml');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function removeConfig() {
  const file = path.join(process.cwd(), '.github', 'dependabot.yml');
  if (fs.existsSync(file)) fs.unlinkSync(file);
}

describe('dependabot configuration validation', () => {
  afterAll(() => {
    removeConfig();
  });

  it('fails when file is missing', () => {
    removeConfig();
    const result = validateDependabot();
    expect(result.ok).toBe(false);
    expect(result.issues).toContain('file not found: .github/dependabot.yml');
  });

  it('fails with malformed yaml', () => {
    writeConfig('::notyaml');
    const result = validateDependabot();
    expect(result.ok).toBe(false);
    expect(result.issues[0]).toMatch(/YAML parse error/);
  });

  it('fails when no updates array', () => {
    writeConfig('version: 2');
    const result = validateDependabot();
    expect(result.ok).toBe(false);
    expect(result.issues).toContain('missing updates array');
  });

  it('fails when no groups or multi-ecosystem groups', () => {
    writeConfig(`version: 2
updates:
  - package-ecosystem: npm
    directory: "/"
    schedule:
      interval: daily
`);
    const result = validateDependabot();
    expect(result.ok).toBe(false);
    expect(result.issues).toContain('no groups or multi-ecosystem groups defined');
  });

  it('passes when top-level groups defined', () => {
    writeConfig(`version: 2
updates:
  - package-ecosystem: npm
    directory: "/"
    schedule:
      interval: weekly
groups:
  "all":
    patterns:
      - "*"
`);
    const result = validateDependabot();
    expect(result.ok).toBe(true);
  });

  it('passes when an update has groups', () => {
    writeConfig(`version: 2
updates:
  - package-ecosystem: maven
    directory: "/"
    schedule:
      interval: monthly
    groups:
      "java":
        patterns:
          - "org.apache.*"
`);
    const result = validateDependabot();
    expect(result.ok).toBe(true);
  });

  it('passes when multi-ecosystem groups are used', () => {
    writeConfig(`version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: weekly
    multi-ecosystem-groups:
      "base":
        patterns:
          - "*"
`);
    const result = validateDependabot();
    expect(result.ok).toBe(true);
  });
});
