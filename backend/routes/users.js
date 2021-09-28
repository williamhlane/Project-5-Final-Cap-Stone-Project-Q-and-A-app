var express = require('express');
var router = express.Router();
var models = require('../lib/models');
const bcrypt = require('bcrypt');
var salt = 10;
const { Sequelize, DataTypes } = require('sequelize');
var Users = models.Users;
let postHeader = [
  'Access-Control-Allow-Origin', 'http://localhost:3000',
  'Access-Control-Allow-Methods', 'POST',
  'Access-Control-Allow-Headers', 'X-Requested-With,content-type',
  'Access-Control-Allow-Credentials', 'true'
]
router.post('/session', (req, res, next) => {
  res.header(postHeader);
  if (req.session) {
    res.write(`{ "authenticated" : "${req.session.authenticated}", "username" : "${req.session.username}" }`);
  } else {
    res.write(`{ "authenticated" : "false", "username" : "nli" }`);
  }
  res.end();
});
router.post('/createuser', async (req, res, next) => {
  bcrypt.hash(req.body.createpassword, salt, async (err, encrypted) => {
    req.body.createpassword = encrypted;
    await Users.count({ where: { 'username': req.body.createusername } }).then((count) => {
      if (count == 0) {
        Users.create({
          username: req.body.createusername,
          password: req.body.createpassword,
          secretQuestion: req.body.secretquestion,
          secretAnswer: req.body.secretanswer
        }).then((a) => {
          res.send(`{ "status" : "success", "username" : "${req.body.createusername}" }`);
        }).catch((error) => {
          res.send(`{ "status" : "Error: ${error}"}`);
        });
      } else {
        console.log("User does exist.")
        res.send(`{ "status" : "Error: That user already exists."}`);
      }
    }).catch((error) => {
      console.log(error);
      res.send(`{ "Error" : "${error}" }`);
    });
  });
});
router.post('/', async function (req, res, next) {
  //THIS IS THE LOGIN USING POST
  await Users.findOne({
    where:
    {
      username: `${req.body.username}`
    }
  }).then((nextThing) => {

    if (nextThing !== null) {
      let tf = bcrypt.compare(req.body.password, nextThing.password, function (err, result) {
        if (result) {
          if (req.session.viewCount) {
            req.session.viewCount += 1;
          } else {
            req.session.viewCount = 1;
          }
          req.session.authenticated = "true";
          req.session.username = req.body.username;
          res.header(postHeader);
          res.write(`{ "authenticated" : "${req.session.authenticated}", "username" : "${req.session.username}" }`);
          res.end();
        } else {
          res.header(postHeader);
          res.write(`{ "status" : "Wrong password." }`);
          res.end();
        }
      });
    } else {
      res.header(postHeader);
      res.write(`{ "status" : "Wrong username." }`);
      res.end();
    }
  })

});
router.put('/', (req, res, next) => {
  //THIS IS THE UPDATE USER USING PUT

});
router.delete('/', (req, res, next) => {
  //THIS IS THE resource that will be called to delete the user

});


module.exports = router;
