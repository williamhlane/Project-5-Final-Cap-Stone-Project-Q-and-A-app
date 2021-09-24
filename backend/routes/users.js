var express = require('express');
var router = express.Router();
var models = require('../lib/models');
const { Sequelize, DataTypes } = require('sequelize');
var users = models.Users;
/* GET users listing. */
router.post('/login', function(req, res, next) {
  /*
  if (req.session) {
    users.findOne({
      where: { username: `${req.session.username}` }
    }).then((data) => {
      res.send(`{ "authenticated" : "${req.session.authenticated}", "username" : "${req.session.username}", 
      "balance" : "${data.balance}" }`);
    }).catch((error) => {

    })
  } else {
    res.send(`{ "authenticated" : "false", "username" : "null" }`);
  }
  */
});

module.exports = router;
