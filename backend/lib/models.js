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

const Categories = db.define('Categories', {
    catName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    /////////////////////////////////
});
const Questions = db.define('Questions', {
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    byWho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    whatCat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answered: {
        type: DataTypes.BOOLEAN,
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
    whatCat: {
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