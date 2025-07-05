// notes.js
const fs = require('fs');
const path = require('path');

const notesDir = path.join(__dirname, 'notes');
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir);
}

const [,, command, fileName, ...content] = process.argv;
const filePath = path.join(notesDir, `${fileName}.txt`);

switch (command) {
  case 'add':
    fs.writeFile(filePath, content.join(' '), err => {
      if (err) return console.error('Error writing note:', err);
      console.log(`Note "${fileName}" added.`);
    });
    break;

  case 'read':
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return console.error('Note not found.');
      console.log(`\n${fileName}.txt:\n${data}`);
    });
    break;

  case 'delete':
    fs.unlink(filePath, err => {
      if (err) return console.error('Note not found.');
      console.log(`Note "${fileName}" deleted.`);
    });
    break;

  default:
    console.log('Usage:\n node notes.js add <title> <content>\n node notes.js read <title>\n node notes.js delete <title>');
}
