
const util = require('./util');
const express = require('express');
const port = 9000;

const app = express();


app.listen(port, () => console.log('server up and running at %s port', port));


// Add headers
app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



app.get('/search/:userName', util.searchUser);
app.get('/repos/:userName/:repoName/commits/dates', util.getCommitDates);


