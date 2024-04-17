const mysql = require('mysql');

// const con = mysql.createConnection({ // it is recommend to use createPool instead of createConnection.
//   host: "localhost",
//   port: "3306",
//   user: "root",
//   password: "password",
//   database: "learn"
// });

// const connectToDatabase = () => {
//     con.connect(function (err, result) {
//         if (err) throw err;
//         console.log("Connected with MySQL successfully!");
//     })
// }


const dbConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "learn"
}

const dbConPool = mysql.createPool(dbConfig);

// module.exports = connectToDatabase; // This is for createConnection
module.exports = dbConPool; // This is for connection pool.