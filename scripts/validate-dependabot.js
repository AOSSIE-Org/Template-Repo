const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Load dependabot configuration and check whether it contains
 * either (1) top-level "groups" definitions, or (2) multi-ecosystem groups
 * under "updates" entries.
 *
 * Returns an object {ok: boolean, issues: string[]} where ok is true if
 * configuration satisfies the feature requirement (groups or multi-ecosystem groups).
 */
function validateDependabot(path = '.github/dependabot.yml') {
  if (!fs.existsSync(path)) {
    return { ok: false, issues: [`file not found: ${path}`] };
  }
  const raw = fs.readFileSync(path, 'utf-8');
  let doc;
  try {
    doc = yaml.load(raw);
  } catch (e) {
    return { ok: false, issues: ['YAML parse error: ' + e.message] };
  }

  const issues = [];
  // if the document isn't an object, treat as parse error
  if (typeof doc !== 'object' || doc === null) {
    return { ok: false, issues: ['YAML parse error: document is not an object'] };
  }

  // the structure: typically at root there's "updates" array.
  if (!doc || !Array.isArray(doc.updates)) {
    issues.push('missing updates array');
    return { ok: false, issues };
  }

  // check if any update has groups or if there's top-level groups
  let foundGroup = false;
  if (doc.groups && Object.keys(doc.groups).length > 0) {
    foundGroup = true;
  }

  for (const upd of doc.updates) {
    if (upd.groups && Object.keys(upd.groups).length > 0) {
      foundGroup = true;
    }
    if (upd['multi-ecosystem'] || upd['multi-ecosystem-groups']) {
      foundGroup = true;
    }
  }

  if (!foundGroup) {
    issues.push('no groups or multi-ecosystem groups defined');
  }

  return { ok: foundGroup, issues };
}

// Export for tests
module.exports = {
  validateDependabot,
};
