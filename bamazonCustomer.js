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

connection.connect(function(err) {
    if (err) throw err;
    start();
});
    
    function start () {
      connection.query("SELECT*FROM products", function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
      for(let i = 0; i < result.length; i++) {
        console.log(
        "----------------------------------------------------------------------------------------------------------\n"
        + "ID: "  + result[i].item_id + " | " + "Item: " + result[i].product_name + " | " 
        + "Dept: " + result[i].department_name + " | " + "Price: $" 
        + result[i].price + " | " + "Quantity: " + result[i].stock_quantity
        + "\n----------------------------------------------------------------------------------------------------------");
      }
    
      inquirer
      .prompt({
      name: "buyItem",
      type: "input",
      message: "What is the ID of the product you wish to buy?",
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    })
    .then(function(answer) {
      if (answer.buyItem > 0 && answer.buyItem < 13) {
        unitQuantity();
      } else{
        console.log("Re-run the code, and enter a valid item ID.")
        end();
      }
    })
  });
}

  function unitQuantity() {
    inquirer
    .prompt([
      {
        name: "quantity",
        type: "input",
        message: "Enter quantity of the item to be purchased."
      },
    ])
    .then(function(answer) {
  })
  console.log("unit quantity function ran");
  end();
};


      //customerPrompt();

  //function customerPrompt () {
    
 // }

  function end () {
    connection.end(function(err) {
      if (err) throw err;

      console.log("connection ended");
    });
  };






  /*function createProduct() {
    console.log("Inserting a new product...\n");
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: "",
        department_name: ,
        price: ,
        stock_quantity: 
      },
      function(err, res) {
        console.log(res.affectedRows + " product inserted!\n");
        // Call updateProduct AFTER the INSERT completes
        updateProduct();
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);

    
    
  }*/

