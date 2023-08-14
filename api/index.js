const mysql = require('mysql');

const con = mysql.createConnection({
  host: "bdcfdh2qf2h2rdsi0cil-mysql.services.clever-cloud.com",
  user: "uyhd2akq9iulvjwk",
  password: "RLuN49OomPBM9ErQhevV",
  database: "bdcfdh2qf2h2rdsi0cil"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("select * from Users", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});


// const mysql = require('mysql2');

// const db = mysql.createPool({
//     host: "bdcfdh2qf2h2rdsi0cil-mysql.services.clever-cloud.com",
//     user: "uyhd2akq9iulvjwk",
//     password: "RLuN49OomPBM9ErQhevV",
//     database: "bdcfdh2qf2h2rdsi0cil",
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
    
// });

module.exports = con;