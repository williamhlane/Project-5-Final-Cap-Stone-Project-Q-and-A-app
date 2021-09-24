var Sequelize =require('sequelize');
const user = "forumU";
const password = "forumP";
const host = "localhost";
const port = "3306";
const database = "forum";
const db = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${database}`);
try {
    db.authenticate();
} catch (error) {
    console.log(error);
}
module.exports = db;
/*
    CREATE DATBASE forum;
    CREATE USER 'forumU'@'localhost' IDENTIFIED BY 'forumP'; 
    GRANT ALL PRIVILEGES ON  forum.* TO 'forumU'@'localhost';
*/