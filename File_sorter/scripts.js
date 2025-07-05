// file-organizer.js
const fs = require('fs');
const path = require('path');

const directoryPath = './downloads'; // Change this to your target directory

fs.readdir(directoryPath, (err, files) => {
  if (err) return console.error('Error reading directory:', err);

  files.forEach(file => {
    const ext = path.extname(file).slice(1); // remove the dot
    if (!ext) return;

    const targetFolder = path.join(directoryPath, ext);

    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }

    const oldPath = path.join(directoryPath, file);
    const newPath = path.join(targetFolder, file);

    fs.rename(oldPath, newPath, err => {
      if (err) console.error(`Error moving file ${file}:`, err);
      else console.log(`Moved: ${file} → ${ext}/`);
    });
  });
});
