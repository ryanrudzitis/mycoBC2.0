const express = require("express");
const multer = require("multer");
const process = require('process')
const path = require('path');
const fs = require('fs');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// for multer
const cwd = process.cwd();

// Navigate up one directory level from the current working directory
const parentDir = path.join(cwd, '..');

// Access the client/public directory relative to the parent directory
const imgFolder = path.join(parentDir, 'client', 'public');
console.log("imgFolder: ", imgFolder);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imgFolder)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("mushrooms")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("mushrooms")
    .findOne({ _id: ObjectId(req.params.id) }, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes
  .route("/uploadImage")
  .post(upload.single("mushroom_img"), function (req, res) {
    console.log(req);
    console.log("in uploadImage");
    var response = "<br>image uploaded successfully</br>";
    return res.send(response);
  });

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myObj = {
    name: req.body.name,
    binomial: req.body.binomial,
    edible: req.body.edible,
    poisonous: req.body.poisonous,
    availability: req.body.availability,
    img: req.body.img,
  };
  db_connect.collection("mushrooms").insertOne(myObj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let id = { _id: ObjectId(req.params.id) };
  let newValues = {
    $set: {
      name: req.body.name,
      binomial: req.body.binomial,
      edible: req.body.edible,
      poisonous: req.body.poisonous,
      availability: req.body.availability,
      // img: req.body.img,
    },
  };
  db_connect.collection("mushrooms").updateOne(id, newValues, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete(async (req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let img = req.body.img;
  
  db_connect.collection("mushrooms").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    // now use fs.unlink to delete the image from the public folder
    const imgPath = path.join(process.cwd(), '..', 'client', 'public', img);
    fs.unlink(imgPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("file deleted");
    });
    response.json(obj);
  });
});

module.exports = recordRoutes;
