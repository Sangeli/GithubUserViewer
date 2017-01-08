import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Util from './Util'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarUrl: '',
      userName: '',
      displayedRepos: []
    }
  }

  search(userName) {
    Util.search(userName).then( results => {
      if(results) {
        this.repoNames = results.repoNames
        this.setState({
          avatarUrl: results.avatarUrl,
          userName: userName
        });
        this.filterRepos('');
      }
    });
  }

  //case insensitive matching
  filterRepos(repoSubStr) {
    repoSubStr.toLowerCase();
    var filteredRepos = [];
    for(var i = 0; i < this.repoNames.length; i ++) {
      const repoName = this.repoNames[i];
      if(repoName.toLowerCase().includes(repoSubStr)) {
        filteredRepos.push(repoName);
      }
    }
    this.setState({
      displayedRepos: filteredRepos
    });
  }

  // updateDisplayedRepos() {
  //   this.filterRepos('');
  // }

  chooseRepo(e) {
    const repoName = e.target.id;
    const userName = this.state.userName;
    Util.getCommitDates(userName, repoName).then( results => {
      debugger;
    });
  }


  renderRepo(repoName) {
    return (
      <div id={repoName} onClick={this.chooseRepo.bind(this)} >{repoName}</div>
    )
  }

  render() {
    return (
      <div>
        <div>
          <h1>GithubUserViewer</h1>
        </div>
        <div className='search'>
          <div className='user-search'>
            <SearchBar
              search={this.search.bind(this)}
              defaultText={'Seach For User'}
            />
            <h2>{this.state.userName}</h2>
            <img
              className='avatar'
              src={this.state.avatarUrl}
            />
          </div>
          <div className='repo-search'>
            <SearchBar
              filter={this.filterRepos.bind(this)}
              defaultText={'Filter Repos'}
            />
            <div className="list-group">
                {this.state.displayedRepos.map(this.renderRepo.bind(this))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
