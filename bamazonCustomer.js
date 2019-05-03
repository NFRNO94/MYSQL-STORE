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

    console.log("connected as id " + connection.threadId + "\n");
    
    connection.end(function(err) {
      if (err) throw err;
      
      console.log("connection ended");
    
    });

    //createProduct();
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

