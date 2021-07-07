const express = require('express');
const app = express();
const cors = require('cors');
const port = 4004;

const router = require('./router');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`) //eslint-disable-line no-console
})