// Generates src/styles/tokens.css from ../brand/tokens.json.
// Run with `npm run tokens` after changing the brand tokens, then commit the result.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('..', import.meta.url);
const tokens = JSON.parse(readFileSync(new URL('../brand/tokens.json', root), 'utf8'));

// tokens.json names -> CSS custom property names used by the site (section 3.3).
const rename = { 'surface-page': 'page', 'surface-card': 'card', 'surface-sage': 'sage' };
const colours = tokens.color.tokens.map((t) => ({ name: rename[t.name] ?? t.name, ...t.value }));
const line = (name, value) => `  --${name}: ${value.toUpperCase()};`;

const light = colours.map((c) => line(c.name, c.light));
const dark = colours.filter((c) => c.dark !== c.light).map((c) => line(c.name, c.dark));
const space = tokens.spacing.tokens.map((t) => `  --${t.name}: ${t.value};`);
const radius = tokens.radius.tokens.map((t) => `  --${t.name}: ${t.value};`);
const fam = tokens.type.families;

const css = `/* Generated from brand/tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */

:root {
  color-scheme: light dark;
${light.join('\n')}
  --icon: var(--highland);
  --error: #B3261E;

${space.join('\n')}

${radius.join('\n')}
  --radius-input: 10px;

  --font-display: ${fam.display};
  --font-body: "Manrope", "Segoe UI", system-ui, Arial, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, Consolas, monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
${dark.map((l) => '  ' + l).join('\n')}
    --icon: var(--on-brand-muted);
    --error: #F2B8B5;
  }
}
`;

writeFileSync(fileURLToPath(new URL('src/styles/tokens.css', root)), css);
console.log('Wrote src/styles/tokens.css');
