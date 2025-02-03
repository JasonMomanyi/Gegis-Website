// filepath: /home/jason/Documents/Class Website/server.js
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(fileUpload());

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  const filePath = `uploads/${file.name}`;

  file.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    uploadToGitHub(filePath, file.name).then(() => {
      fs.unlink(filePath, () => {
        res.send('File uploaded successfully!');
      });
    }).catch(err => {
      fs.unlink(filePath, () => {
        res.status(500).send(err);
      });
    });
  });
});

function uploadToGitHub(filePath, fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'base64', (err, data) => {
      if (err) {
        return reject(err);
      }

      const content = Buffer.from(data, 'base64').toString('base64');
      const message = `Upload ${fileName}`;

      axios.put(`https://api.github.com/repos/JasonMomanyi/Gegis-Website/contents/assets/Resources/${fileName}`, {
        message,
        content
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(err);
      });
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
