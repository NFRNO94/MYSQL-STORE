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

    //console.log("connected as id " + connection.threadId + "\n");
    connection.query("SELECT*FROM products", function (err, result, fields) {
      if (err) throw err;
      //console.log(result);

      for(var i = 0; i < result.length; i++) {
        console.log(
        "-----------------------------------------------------------------------------------------------------------------------------------\n"
        + "item ID: "  + result[i].item_id + " | " + "Product: " + result[i].product_name + " | " 
        + "Department Name: " + result[i].department_name + " | " + "Price: $" 
        + result[i].price + " | " + "Quantity Available: " + result[i].stock_quantity
        + "\n-----------------------------------------------------------------------------------------------------------------------------------");
      }
      connection.end(function(err) {
        if (err) throw err;
        
        console.log("connection ended");
      
      });
  });
});




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

