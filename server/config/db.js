const mysql = require('mysql')
const db = mysql.createConnection({
host: "mealspotter-db-1.ci30xqa9vlys.us-west-2.rds.amazonaws.com",
user: "admin",
password: "DonnellyP",
database:"MealSpotter" 
})

module.exports = db;
