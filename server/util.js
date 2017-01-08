const axios = require('axios');




exports.searchUser = (req, res, next) => {
  const userName = req.params.userName;
  console.log("searchUser", userName);
  const url = `https://api.github.com/users/${userName}/repos`;
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



exports.getCommitDates = (req, res, next) => {
  const userName = req.params.userName;
  const repoName = req.params.repoName;
  const url = `https://api.github.com/repos/${userName}/${repoName}/commits`;

  return axios.get(url, {
    params: {author: userName}
  }).then( response => {
    let lastCommit;
    var countByDay = {};
    for(var i =0; i < response.data.length; i++) {
      const fullCommitInfo = response.data[i];
      if(fullCommitInfo.author != null) {
        commitDate = new Date(fullCommitInfo.commit.author.date);
        //converts to a date without time
        dateString = commitDate.toDateString();
        //the last commit will be found first
        lastCommit = lastCommit || dateString;
        countByDay[dateString] = countByDay[dateString] || 0;
        countByDay[dateString] ++;
      }
    }
    res.send({lastCommit, countByDay});
  });
}

