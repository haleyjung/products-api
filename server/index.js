const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const pool = require("./db");
require('dotenv').config();

const PORT = process.env.PORT;

// middlewares for logging and parsing
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('SDC products endpoint :^)');
});

app.get('/products', (req, res) => {
  const page = Number(req.query.page);
  const count = Number(req.query.count);

  pool.getAll((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  })
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});