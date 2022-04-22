const express = require('express');
const app = express();

const router = require('./router.js');

const cors = require("cors");
const morgan = require("morgan");

require('dotenv').config();
const PORT = process.env.PORT;

// middlewares for logging and parsing
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});