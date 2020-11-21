const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
// const mysql = require('mysql');
const uuid = require('uuid/v4');
const config = require('./config');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Ydvhs2015~',
//   database: 'yelp_db',
// });
// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('MySQL Connected...');
// });

aws.config.update(config.awsConfig);
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'yelppictures',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, req.s3Key);
    },
  }),
});
const singleFileUpload = upload.single('image');

function uploadToS3(req, res) {
  req.s3Key = uuid();
  // const downloadUrl = `https://s3-${config.awsConfig.region}.amazonaws.com/yelppictures/${req.s3Key}`;
  const downloadUrl = `https://yelppictures.s3-us-west-1.amazonaws.com/${req.s3Key}`;
  return new Promise((resolve, reject) => singleFileUpload(req, res, (err) => {
    if (err) {
      return reject(err);
    }
    return resolve(downloadUrl);
  }));
}
module.exports = {
  uploadImageToS3: (req, res) => {
    uploadToS3(req, res)
      .then((downloadUrl) => {
        // console.log(downloadUrl);
        res.status(200).send({ downloadUrl });
        // .then(() => res.status(200).send({downloadUrl}))
      // .catch((e) => {
      //   console.log(e);
      });
  },
};
