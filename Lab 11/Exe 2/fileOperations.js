const fs = require('fs');

const filePath = 'sample.txt';
const initialContent = 'This is the initial file content.\n';
const appendedContent = 'This line was appended later.\n';

console.log('Starting file operations...');

fs.writeFile(filePath, initialContent, (writeError) => {
  if (writeError) {
    console.error('Error creating file:', writeError.message);
    return;
  }

  console.log('File created successfully.');

  fs.readFile(filePath, 'utf8', (readError, data) => {
    if (readError) {
      console.error('Error reading file:', readError.message);
      return;
    }

    console.log('File content after create:\n' + data);

    fs.appendFile(filePath, appendedContent, (appendError) => {
      if (appendError) {
        console.error('Error appending to file:', appendError.message);
        return;
      }

      console.log('Data appended successfully.');

      fs.readFile(filePath, 'utf8', (readAfterAppendError, updatedData) => {
        if (readAfterAppendError) {
          console.error('Error reading file after append:', readAfterAppendError.message);
          return;
        }

        console.log('File content after append:\n' + updatedData);

        fs.unlink(filePath, (deleteError) => {
          if (deleteError) {
            console.error('Error deleting file:', deleteError.message);
            return;
          }

          console.log('File deleted successfully.');
          console.log('All file operations completed in sequence.');
        });
      });
    });
  });
});
