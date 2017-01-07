import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Profile from './Profile';
import Util from './Util'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarUrl: '',
      repoNames: []
    }
  }

  search(userName) {
    Util.search(userName).then( results => {
      this.setState({
        avatarUrl: results.avatarUrl,
        repoNames: results.repoNames
      })
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          search={this.search.bind(this)}
        />
        <Profile
          avatarUrl={this.state.avatarUrl}
        />
      </div>
    );
  }
}

export default App;
