const mysql = require("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon_DB"
});

//start connection to the db
connection.connect(function (err) {
  if (err) throw err;
  start();
});

//console log the table results from the connection
function start() {
  connection.query("SELECT*FROM products", function (err, result, fields) {
    if (err) throw err;

    for (let i = 0; i < result.length; i++) {
      console.log(
        "----------------------------------------------------------------------------------------------------------\n"
        + "ID: " + result[i].item_id + " | " + "Item: " + result[i].product_name + " | "
        + "Dept: " + result[i].department_name + " | " + "Price: $"
        + result[i].price + " | " + "Quantity: " + result[i].stock_quantity
        + "\n----------------------------------------------------------------------------------------------------------");
    }
    //run function give prompt to buy an item
    selectItemToBuy();
  })
}

//select an item to buy, and select quantity
function selectItemToBuy() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What is the product you wish to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "Enter the quantity of the item to be purchased."
        }
      ])
      .then(function (answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
          //update the stock of the item selected after the user inputs a quantity to buyy
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenItem.stock_quantity - parseInt(answer.quantity)
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Product order has been placed!");
              continueEnd();
            }
          );
        } else {
          console.log("There is not enough quantity of this item in stock.")
          continueEnd();
        }
      });
  });
}

//ask user if they want to buy another item, or exit
function continueEnd() {
  inquirer
    .prompt([
      {
        name: "buyAnother",
        type: "list",
        message: "Do you want to buy another item?",
        choices: ["Continue Shopping", "Exit"]
      }
    ])
    .then(function (answer) {
      switch (answer.buyAnother) {
        case "Continue Shopping":
          start();
          break;
        case "Exit":
          end();
          break;
      }
    });
}

//end connection
function end() {
  connection.end(function (err) {
    if (err) throw err;

    console.log("connection ended");
  });
};