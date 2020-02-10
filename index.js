const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router.js');

const app = express();

app.use('/www', express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));//键值对中的值就为'String'或'Array'形式
app.use(bodyParser.json());
app.use(router);

app.listen(3000, () => {
  console.log('running');
})