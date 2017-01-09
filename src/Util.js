import reactCookie from 'react-cookie';
import axios from 'axios';

const ip = 'localhost';
const port = '9000';
const localURL = `http://${ip}:${port}`;
const digitalOceanURL = `http://138.197.210.121:${port}`;
const serverURL = (reactCookie.load('UseDev') === '1') ? localURL : digitalOceanURL;


exports.search = (userName) => {
  const url = `${serverURL}/search/${userName}`;
  return axios.get(url).then( response => {
    return response.data;
  });
}

exports.getCommitDates = (userName, repoName) => {
  const url = `${serverURL}/repos/${userName}/${repoName}/commits/dates`;
  return axios.get(url).then( response => {
    return response.data;
  });
}