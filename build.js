const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Primary root files
const rootFiles = [
  'index.html',
  '_headers',
  '_redirects'
];

for (const file of rootFiles) {
  const src = path.join(rootDir, file);
  const dest = path.join(publicDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Synced ${file} -> public/${file}`);
  }
}

// Archive / legacy pages copied to public for URL backward compatibility
const archiveFiles = [
  'sample_tuannguyen.html',
  'index2.html',
  'index_original_template.html'
];

for (const file of archiveFiles) {
  const src = path.join(rootDir, 'archive', file);
  const dest = path.join(publicDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Synced archive/${file} -> public/${file}`);
  }
}

console.log('Build completed: public/ directory is ready for Cloudflare deployment.');
