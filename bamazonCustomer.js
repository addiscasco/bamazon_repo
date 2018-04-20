var mysql = require("mysql");
var inquirer = require("inquirer");

//opens tunnel between node and mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Green1992!",
    database: 'bamazon'
});

//opens gate -- have a way to pass info through the gate before it closes
connection.connect(function (err) {
    if (err) throw (err);
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw (err);
        console.log("   WELCOME TO BAMAZON   ");
        console.log("========================");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + "|" + res[i].product_name + "|" + "PRICE: " + res[i].price + "|" + "QTY: " + res[i].stock_quantity);
        };
        start(res);
    })
});
//starts questions to customer
function start(res) {
    inquirer.prompt([
        {
            type: "input",
            name: "productID",
            message: "Please enter ID of product you would like to buy",
        },
        {
            type: "input",
            name: "qtyDesired",
            message: "How many would you like to purchase?",
        }
    ])
        .then(function (answer) {
            var identification = parseInt(answer.productID);
            var requestedQuantity = parseInt(answer.qtyDesired);
            var selectedProduct;
            connection.query(`SELECT * FROM products WHERE id = ${identification}`, function (err, res) {
                if (res[0].stock_quantity < requestedQuantity) {
                    console.log("cannot fulfill order");
                    start(res);
                }
                else {
                    connection.query(`UPDATE products SET stock_quantity = ${res[0].stock_quantity} - ${requestedQuantity} WHERE id = ${identification}`);

                    console.log("Your order is complete!");
                    console.log(`ID: ${identification} NEW QUANTITY: ${res[0].stock_quantity - requestedQuantity}`);
                    console.log(`Your TOTAL: ${res[0].price * requestedQuantity}`);
                }
            });
        })
}