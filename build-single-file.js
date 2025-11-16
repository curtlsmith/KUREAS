import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

console.log('Building single-file HTML version...');

// Read the dist directory
const distPath = './dist';
const assetsPath = join(distPath, 'assets');

// Find the CSS and JS files (they have hashed names)
const assetFiles = readdirSync(assetsPath);
const cssFile = assetFiles.find(f => f.endsWith('.css'));
const jsFile = assetFiles.find(f => f.endsWith('.js'));

if (!cssFile || !jsFile) {
  console.error('Could not find CSS or JS files in dist/assets');
  process.exit(1);
}

console.log(`Found CSS: ${cssFile}`);
console.log(`Found JS: ${jsFile}`);

// Read the files
const css = readFileSync(join(assetsPath, cssFile), 'utf-8');
const js = readFileSync(join(assetsPath, jsFile), 'utf-8');

// Create the single HTML file
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KUREAS-FTA - Fault Tree Analysis</title>
    <style>
${css}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
${js}
    </script>
  </body>
</html>`;

// Write the single file
const outputPath = './kureas-fta-standalone.html';
writeFileSync(outputPath, html, 'utf-8');

console.log(`✓ Single-file HTML created: ${outputPath}`);
console.log(`✓ File size: ${(html.length / 1024).toFixed(2)} KB`);
