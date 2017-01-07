
const util = require('./util');
const express = require('express');
const port = 9000;

const app = express();


app.listen(port, () => console.log('server up and running at %s port', port));

app.get('/search/:userName', util.searchUser);


