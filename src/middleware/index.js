const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

exports.rename = (req, res, next) => {
  let uuid = uuidv4();
  let mime = req.file.mimetype.split('/')[1];
  let oldPath = path.join(
    __dirname,
    `../../public/avatar/${req.file.filename}`
  );
  let newPath = path.join(__dirname, `../../public/avatar/${uuid}.${mime}`);
  req.body.image = `${uuid}.${mime}`;
  fs.rename(oldPath, newPath, (err) => {
    if (err) console.log('File not renamed');
    else {
      console.log(`File renamed`);
    }
  });
  next();
};
