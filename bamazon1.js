var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Green1992!",
    database: 'bamazon'
});


connection.connect(function (err) {
    if (err) throw (err);
    console.log(`connected as id ${connection.threadId}`);

    //make the connection and then pass the query and a callbk function
    // connection.query("SELECT * FROM music", function (err, res) {
    //     if (err) throw err;

       

        // console.log(res[1].title);
    });

// })