const axios = require('axios');




exports.searchUser = (req, res, next) => {
  const userName = req.params.userName;
  const url = `https://api.github.com/users/${userName}/repos`;
  return axios.get(url).then( response => {
    console.log('got response with', userName);
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



exports.getCommitDates = (req, res, next) => {
  const userName = req.params.userName;
  const repoName = req.params.repoName;
  const url = `https://api.github.com/repos/${userName}/${repoName}/commits`;

  return axios.get(url).then( response => {
    var commitDates = [];
    for(var i =0; i < response.data.length; i++) {
      const fullCommitInfo = response.data[i];
      if ( (fullCommitInfo.author != null) & (fullCommitInfo.author.login === userName)) {
        commitDate = fullCommitInfo.commit.date;
        commitDates.push(commitDate);
      }
    }
    console.log('commitDates', commitDates)
    res.send({commitDates});
  });
}

