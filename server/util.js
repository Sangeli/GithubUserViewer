const axios = require('axios');



exports.searchUser  = (req, res, next) => {
  const userName = req.params.userName;
  const url = `https://api.github.com/users/${userName}/repos`;
  return axios.get(url).then( response => {
    console.log('response', response.data);
  });
}




