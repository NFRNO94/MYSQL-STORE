const mysql = require("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "12069418Dp",
  database: "bamazon_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  connection.query("SELECT*FROM products", function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    for (let i = 0; i < result.length; i++) {
      console.log(
        "----------------------------------------------------------------------------------------------------------\n"
        + "ID: " + result[i].item_id + " | " + "Item: " + result[i].product_name + " | "
        + "Dept: " + result[i].department_name + " | " + "Price: $"
        + result[i].price + " | " + "Quantity: " + result[i].stock_quantity
        + "\n----------------------------------------------------------------------------------------------------------");
    }
    inquirer
      .prompt([
        {
          name: "buyItem",
          type: "rawlist",
          choices: function () {
            let choiceArray = [];
            for (let i = 0; i < result.length; i++) {
              choiceArray.push(result[i].product_name);
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
        let chosenItem;
          if (answer.buyItem) {
            chosenItem = answer.buyItem;
            console.log("Chosen item: " + chosenItem);
          }
        if (parseInt(answer.quantity) < chosenItem.stock_quantity) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: result[i].stock_quantity - answer.quantity
              },
              {
                id: chosenItem.result[i].item_id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Product order has been placed!");
            }
          )
        } else {
          console.log("There is not enough quantity of this item in stock.")
        }
        //if (answer.buyItem) {
        //unitQuantity();
        //}*/
        end();
      })
  })
}

function end() {
  connection.end(function (err) {
    if (err) throw err;

    console.log("connection ended");
  });
};