require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(500).json({ message: 'fodase' });
});

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
