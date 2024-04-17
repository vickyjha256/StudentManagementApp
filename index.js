const express = require('express');
const app = express();
// const bodyParser = require('body-parser');

// Middleware
// app.use(bodyParser.json()); // Instead of this We can use express.json() for parsing json data.
app.use(express.json()); // This is used for json body parsing.


const port = process.env.PORT || 5000;

// connectToDatabase(); // It will connect to the MySQL database. When using createConnection().


// app.get('/', (req, res) => {
//   res.send('Hello Darling!');
// });

app.use('/api/student', require('../NodeSQL/Controller/studentController'));

app.listen(port, () => {
  console.log(`NodeSQL app running on PORT: ${port}`);
});