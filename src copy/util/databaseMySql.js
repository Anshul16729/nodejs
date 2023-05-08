// const mysql= require('mysql2');

// const pool=mysql.createPool({
//     host:"localhost",
//     user:"root",
//     database:"node-complete",
//     password:""
// })


// module.exports=pool.promise();

var mysql = require('mysql2');  
var con = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "",
  database:"node-complete",
});  
con.connect(function(err) {  
  if (err) throw err;  
  console.log("Connected!");  
});  

module.exports=con.promise();