var express = require('express');
var router = express.Router();
var models = require('../lib/models');
let categories = models.categories;
let answers = models.Answers;
let questions = models.Questions;
let postHeader = [
  'Access-Control-Allow-Origin', 'http://localhost:3000',
  'Access-Control-Allow-Methods', 'POST',
  'Access-Control-Allow-Headers', 'X-Requested-With,content-type',
  'Access-Control-Allow-Credentials', 'true'
]
let delHeader = [
  'Access-Control-Allow-Origin', 'http://localhost:3000',
  'Access-Control-Allow-Methods', 'DELETE',
  'Access-Control-Allow-Headers', 'X-Requested-With,content-type',
  'Access-Control-Allow-Credentials', 'true'
]
let putHeader = [
  'Access-Control-Allow-Origin', 'http://localhost:3000',
  'Access-Control-Allow-Methods', 'PUT',
  'Access-Control-Allow-Headers', 'X-Requested-With,content-type',
  'Access-Control-Allow-Credentials', 'true'
]
router.get('/' , (req, res, next) => {
  //This will provide a list of categorys, questions and answers
});
router.post('/', (req, res, next) => {
  //ADD CATEGORY, question and answer
  ///This chuck of code is to create the category///////////////////
  if (req.session.username === req.body.username) {
    if (typeof (req.body.newCategory) !== "undefined") {
      categories.count({ where: { 'catName': req.body.newCategory } })
        .then((count) => {
          if (count == 0) {
            categories.create({
              catName: req.body.newCategory,
              owner: req.session.username,
            }).then((res) => {
              res.header(postHeader);
              res.write(`{ "results" : "Success ${req.body.newCategory} was created!"}`);
              res.end();
            }).catch((error) => {
              res.header(postHeader);
              res.write(`{ "results" : "${error}"}`);
              res.end();
            });
          } else {
            res.header(postHeader);
            res.write(`{ "results" : "That category exists."}`);
            res.end();
          }
        }).catch((error) => {
          res.header(postHeader);
          res.write(`{ "results" : "${error}"}`);
          res.end();
        });
    }
   /////////////////////////////////////////////////////////////// 
  } else {
    res.header(postHeader);
    res.write(`{ "results" : "Session name does not match one sent."}`);
    res.end();
  }
});
router.delete('/', (req, res, next) => {
  //DELETE CATEGORY, question and answer

});
router.put('/', (req, res, next) => {
  //edit question and answer

});


module.exports = router;
