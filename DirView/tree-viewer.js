// tree-viewer.js
const fs = require('fs');
const path = require('path');

function printTree(dirPath, indent = '') {
  const items = fv 

  items.forEach((item, index) => {
    const fullPath = path.join(dirPath, item);
    const isLast = index === items.length - 1;
    const prefix = isLast ? '└── ' : '├── ';
    const nextIndent = indent + (isLast ? '    ' : '│   ');

    const stats = fs.statSync(fullPath);
    console.log(indent + prefix + item);

    if (stats.isDirectory()) {
      printTree(fullPath, nextIndent);
    }
  });
}

const targetDir = process.argv[2] || '.';
printTree(targetDir);
