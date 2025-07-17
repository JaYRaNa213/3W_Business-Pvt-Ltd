import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IGNORE_DIRS = ['node_modules', 'dist', 'build', '.git', '.next', '.vscode', '.idea', 'coverage'];

let output = '📁 3W PVT LTD Task 1 :\n\n';

function printTree(dir, prefix = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true })
    .filter(item => !IGNORE_DIRS.includes(item.name));

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const icon = isLast ? '└── ' : '├── ';
    output += prefix + icon + item.name + '\n';

    if (item.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      printTree(path.join(dir, item.name), newPrefix);
    }
  });
}

printTree(__dirname);

// Write to tree.txt
fs.writeFileSync(path.join(__dirname, 'tree.txt'), output);
console.log('✅ Folder tree saved to tree.txt');
