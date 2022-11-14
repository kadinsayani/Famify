// const express = require("express");
// const userRoutes = express.Router();

// // connect to databse
// const dbo = require("../db/conn");

// // This helps convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;

// const bodyParser = require('body-parser')
// userRoutes.use(bodyParser.urlencoded({
//   extended: true
// }));

// // get all users
// userRoutes.route("/user").get(function (req, res) {
//   let db_connect = dbo.getDb("Famify");
//   db_connect
//     .collection("users")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

// // get one user by id
// userRoutes.route("/user/:id")

//   // get one user
//   .get(function (req, res) {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId(req.params.id) };
//     db_connect.collection("user").findOne(myquery, function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
//   })

//   // update user
//   .put(function (req, response) {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId(req.params.id) };
//     let newvalues = {
//       $set: {
//         name: req.body.name,
//         email: req.body.email,
//         family: req.body.family,
//       },
//     };
//     db_connect
//       .collection("users")
//       .updateOne(myquery, newvalues, function (err, res) {
//         if (err) throw err;
//         console.log("1 document updated");
//         response.json(res);
//       });
//   })

//   // delete user
//   .delete((req, response) => {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId(req.params.id) };
//     db_connect.collection("users").deleteOne(myquery, function (err, obj) {
//       if (err) throw err;
//       console.log("1 document deleted");
//       response.json(obj);
//     });
//   });

// // create new user and add to database
// userRoutes.route("/user/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj = {
//     name: req.body.name,
//     email: req.body.email,
//     family: req.body.family,
//   };

//   db_connect.collection("users").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// module.exports = userRoutes;
