var express = require('express');
var router = express.Router();
var models = require('../lib/models');
let Categories = models.Categories;
let Answers = models.Answers;
let Questions = models.Questions;
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
router.get('/', (req, res, next) => {
  //This will provide a list of categorys, questions and answers
});
router.post('/', async (req, res, next) => {
  //ADD CATEGORY, question and answer
  ///This chuck of code is to create the category///////////////////
  if (req.session.username === req.body.username) {
    if (typeof (req.body.newCategory) !== "undefined") {
      await Categories.count({ where: { 'catName': req.body.newCategory } })
        .then(async (count) => {
          if (count == 0) {
            await Categories.create({
              catName: req.body.newCategory,
              owner: req.session.username,
            }).then((results) => {
              console.log(results);
              res.send(`{ "results" : "Success ${req.body.newCategory} was created!"}`);
            }).catch((error) => {
              res.send(`{ "results" : "${error}"}`);
            });
          } else {
            res.send(`{ "results" : "That category exists."}`);
          }
        }).catch((error) => {
          res.send(`{ "results" : "${error}"}`);
        });
    }
    /////////////////////////////////////////////////////////////// 
  } else {
    res.send(`{ "results" : "Session name does not match one sent."}`);
  }
});
router.delete('/', (req, res, next) => {
  //DELETE CATEGORY, question and answer

});
router.put('/', (req, res, next) => {
  //edit question and answer

});


module.exports = router;
