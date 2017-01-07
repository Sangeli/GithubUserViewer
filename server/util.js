const axios = require('axios');




exports.searchUser  = (req, res, next) => {
  const userName = req.params.userName;
  const url = `https://api.github.com/users/${userName}/repos`;
  console.log('tp');
  return axios.get(url).then( response => {
    const repos = response.data;
    var avatarUrl;
    var repoNames = [];
    for(var i =0; i < repos.length; i++) {
      var repo = repos[i];
      avatarUrl = repo.owner.avatar_url;
      repoNames.push(repo.name);
    }
    res.send({avatarUrl, repoNames});
  });
}




