const { Sequelize, DataTypes } = require('sequelize');

const db = require('./databaseconnect');
//This is the users table. It has the username password and the Balance the person has and the stocks owned as JSON///
const Users = db.define('Users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    secretQuestion:{
        type: DataTypes.STRING,
        allowNull: true
    },
    secretAnswer: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    /////////////////////////////////
});
/*
        username: req.body.createusername,
        password: encrypt(req.body.createpassword),
        secretQuestion: encrypt(req.body.secretQuestion),
        secretAnswer: encrypt(req.body.secretAnswer)

*/
const Categories = db.define('Categories', {
    catName: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    /////////////////////////////////
});
const Questions = db.define('Questions', {
    Question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    byWho: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    /////////////////////////////////
});
const Answers = db.define('Answers', {
    answer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    toWhat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    byWho:{
        type: DataTypes.STRING,
        allowNull: true
    },
},{
    /////////////////////////////////
});
db.sync();
module.exports.Answers = Answers;
module.exports.Questions = Questions;
module.exports.Users = Users;
module.exports.Categories = Categories;