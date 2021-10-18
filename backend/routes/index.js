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
    console.log('list cat');
    ///START HERE RETURN JSON THAT LISTS THE CATEGORIES
    Categories.findAll()
      .then((results) => {
        let tempOb = {};
        let i = 0;
        console.log(results.length);

        results.forEach(element => {
         // tempArray.push(element.catName);
          tempOb[element.catName] = { catName : `${element.catName}`, owner : `${element.owner}` };
          i++;
        });
        res.send(JSON.stringify(tempOb));
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
    /////////////////////////////////////////////////////////////// 
  } else {
    res.send(`{ "results" : "Session name does not match one sent."}`);
  }
});
router.delete('/', async (req, res, next) => {
  //DELETE CATEGORY, question and answer
  if (typeof (req.body.delCategory) !== "undefined") {
    //NEEDS TO LOOK UP WHO CREATED IT.
    await Categories.findOne({
      where: {
        catName: req.body.delCategory,
      }
    }).then(async (results) => {
      if (results.owner === req.session.username) {
        await Questions.destroy({
          where: {
            whatCat: req.body.delCategory,
          }
        }).then((n) => {
          console.log(n);
        }).catch((error) => {
          console.log(error);
        });
        await Answers.destroy({
          where: {
            whatCat: req.body.delCategory,
          }
        }).then((n) => {
          console.log(n);
        }).catch((error) => {
          console.log(error);
        });
        await Categories.destroy({
          where: {
            catName: req.body.delCategory,
          }
        }).then((n) => {
          console.log(n);
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

    
  }

});
router.put('/', (req, res, next) => {
  //edit question and answer

});


module.exports = router;
