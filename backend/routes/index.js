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
  if (req.query.dowhat === "listcategories") {
    Categories.findAll()
      .then((results) => {
        let tempArray = [];
        results.forEach(element => {
          tempArray.push({ catName: `${element.catName}`, owner: `${element.owner}`, id: `${element.id}` });
        });
        res.send(JSON.stringify(tempArray));
      }).catch((error) => {
        console.log(error);
      });
  } else if (req.query.dowhat === "listquestions") {

    Questions.findAll().then((results) => {
      let tempArray = [];
      results.forEach(element => {
        tempArray.push({
          id: `${element.id}`,
          question: `${element.question}`,
          byWho: `${element.byWho}`,
          answered: `${element.answered}`,
          whatCatID: `${element.whatCatID}`,
        });
      });
      res.send(JSON.stringify(tempArray));
    }).catch((error) => {
      console.log(error);
    });
  } else if (req.query.dowhat === "listanswers") {

    Answers.findAll({
      where: {
        toWhat: req.query.questionId,
      }
    }).then((results) => {
      let tempArray = [];
      results.forEach(element => {
        tempArray.push({
          id: `${element.id}`,
          answer: `${element.answer}`,
          toWhat: `${element.toWhat}`,
          whatCatID: `${element.whatCatID}`,
          byWho: `${element.byWho}`,
          createdAt: `${element.createdAt}`,
        });
      });
      res.send(JSON.stringify(tempArray));
    }).catch((error) => {
      console.log(error);
    });

  } else {
    res.send("Error.")
  }
  //res.send(req.query);
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
    if (typeof (req.body.newQuestion) !== "undefined") {
      await Questions.count({ where: { 'question': req.body.newQuestion } })
        .then(async (count) => {
          if (count == 0) {
            await Questions.create({
              question: req.body.newQuestion,
              byWho: req.session.username,
              whatCatID: req.body.currentCat,
              answered: false,
            }).then((results) => {
              console.log(results);
              res.send(`{ "results" : "Success ${req.body.newQuestion} was created!"}`);
            }).catch((error) => {
              res.send(`{ "results" : "${error}"}`);
            });
          } else {
            res.send(`{ "results" : "That question exists."}`);
          }
        }).catch((error) => {
          res.send(`{ "results" : "${error}"}`);
        });
    }
    if (typeof (req.body.newAnswer) !== "undefined") {
      await Questions.update({ answered: true },
        {
          where: {
            id: req.body.toWhat,
          }
        }).catch((error) => {
          console.log(error);
        });
      await Answers.count({ where: { 'answer': req.body.newAnswer } })
        .then(async (count) => {
          if (count == 0) {
            await Answers.create({
              answer: req.body.newAnswer,
              toWhat: req.body.toWhat,
              whatCatID: req.body.whatCatID,
              byWho: req.body.byWho,
            }).then((results) => {
              console.log(results);
              res.send(`{ "results" : "Success ${req.body.newAnswer} was created!"}`);
            }).catch((error) => {
              res.send(`{ "results" : "${error}"}`);
            });
          } else {
            res.send(`{ "results" : "That question exists."}`);
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

router.delete('/', async (req, res, next) => {
  if (typeof (req.body.delCategoryID) !== "undefined") {
    await Categories.findOne({
      where: {
        id: req.body.delCategoryID,
      }
    }).then(async (results) => {
      if (results.owner === req.session.username) {
        await Questions.destroy({
          where: {
            whatCatID: req.body.delCategoryID,
          }
        }).then((n) => {
          console.log(`Delete questions results: ${n}`);
        }).catch((error) => {
          console.log(error);
        });
        await Answers.destroy({
          where: {
            whatCatID: req.body.delCategoryID,
          }
        }).then((n) => {
          console.log(`Delete answers results: ${n}`);
        }).catch((error) => {
          console.log(error);
        });
        await Categories.destroy({
          where: {
            id: req.body.delCategoryID,
          }
        }).then((n) => {
          console.log(`Delete Category results: ${n}`);
          res.send(`{ "results" : "Done" }`);
        }).catch((error) => {
          console.log(error);
        });
      } else {
        console.log('Error username does not match owner.');
        res.send(`{ "results" : "Error username does not match owner." }`);
      }
    }).catch((error) => {
      console.log(error);
    });
  } else if (typeof (req.body.delQuestionID) !== "undefined") {
    Questions.findOne({
      where: {
        id: req.body.delQuestionID,
      }
    }).then(async (results) => {
      if (results.byWho === req.session.username) {
        await Questions.destroy({
          where: {
            id: req.body.delQuestionID,
          }
        }).then((n) => {
          console.log(`Delete questions results: ${n}`);
        }).catch((error) => {
          console.log(error);
        });
        await Answers.destroy({
          where: {
            toWhat: req.body.delQuestionID,
          }
        }).then((n) => {
          console.log(`Delete answers results: ${n}`);
        }).catch((error) => {
          console.log(error);
        });
        res.send(`{ "results" : "Done" }`);
      } else {
        res.send(`{ "results" : "Error, you are not the owner."}`);
      }
    }).catch((error) => {
      console.log(error);
    });
  } else if (typeof (req.body.delAnswerID) !== "undefined") {
    ///////////////////DELETE ANSWER///////////////////////////////
    Answers.findOne({
      where: {
        id: req.body.delAnswerID,
      }
    }).then( async (results) => {
      if (results.byWho === req.session.username) {/////CHECK OWNER
        await Answers.destroy({
          where: {
            id: req.body.delAnswerID,
          }
        }).then((n) => {
          console.log(`Delete answers results: ${n}`);
          res.send(`{ "results" : "Done" }`);
        }).catch((error) => {
          console.log(error);
        });
      } else {
        res.send(`{ "results" : "Error, you are not the owner."}`);
      }
    }).catch((error) => {
      console.log(error);
    });
    /////////////////////////////////////////////////////////
  }

});
router.put('/', (req, res, next) => {
  //edit question and answer
});


module.exports = router;
