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
    // console.log(`connected as id ${connection.threadId}`);

    // //make the connection and then pass the query and a callbk function
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + "|" + res[i].product_name + " |" + res[i].price);
        };
        start();
        //  console.log(res);
    });

});

function start() {
    inquirer.prompt([{
        type: "input",
        name: "productID",
        message: "Please enter ID of product you would like to buy"
    },
    {
        type: "input",
        name: "quanityDesired",
        message: "How many would you like to purchase?"
    }
    ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            

            //get the information of the chosen item 
            var chosenProduct;
            for (var i=0; i <res.length; i++) {
                if (results[i].id === answer.productID){
                    chosenProduct = results[i];
                }
            }

            // connection.query(
            //     "SELECT * FROM products ?",
            //     {
            //         id: answer.id,
            //         stock_quantity: answer.stock_quantity
            //     },
            //     function () {
            //         if (error) throw error;
            //         console.log("ajfldkjf;lasdf");
            //         // re-prompt the user for if they want to bid or post
            //         // start();
            //     }
            // );
        
        });
}

// function chkInventory () {
//     if (stock_quantity > 0){
//         //fulfill the order, update SQL DB, show cost of total purchase
//     }
//     else {
//         console.log("Sorry, out of stock!");
//     }

// }


