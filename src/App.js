import React, { Component } from 'react';
import SearchBar from './SearchBar';
import CalendarHeatmap from 'react-calendar-heatmap';
import Util from './Util'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.repoNames = []
    this.state = {
      avatarUrl: '',
      userName: '',
      displayedRepos: [],
      selectedRepo: null,
      countByDay: {},
      lastCommit: null
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
      console.log('results', results);
      const lastCommit = new Date(results.lastCommit);
      this.setState({
        selectedRepo: repoName,
        countByDay: results.countByDay,
        lastCommit: lastCommit
      });
    });
  }


  renderRepo(repoName) {
    return (
      <div id={repoName} onClick={this.chooseRepo.bind(this)} key={repoName} >{repoName}</div>
    )
  }

  renderCalendar() {
    //reformat for calendar
    var calendarDates = [];
    for (var commitDate in this.state.countByDay) {
      const obj = {date: commitDate, count: this.state.countByDay[commitDate]};
      calendarDates.push(obj);
    }
    console.log('calendarDates', calendarDates);
    return (
      <div className='calendar-wrapper'>
        <CalendarHeatmap
          endDate={this.state.lastCommit}
          numDays={100}
          values={calendarDates}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            } else if (value.count >= 4) {
              return 'color-scale-4';
            }
            return `color-scale-${value.count}`;
          }}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className='search'>
          <h1>GithubUserViewer</h1>
          <br/>
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
        <div className='commit-calendar'>
          <br/>
          <br/>
          <br/>
          <h3>{this.state.selectedRepo ? this.state.selectedRepo + ' commits by ' + this.state.userName : 'Click repo'}</h3>
          { this.state.lastCommit ? this.renderCalendar() : ''}
        </div>
      </div>
    );
  }
}

export default App;
