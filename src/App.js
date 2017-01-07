import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Util from './Util'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  search(userName) {
    Util.search(userName).then( results => {

    });
  }

  render() {
    return (
      <SearchBar
        search={this.search.bind(this)}
      />
    );
  }
}

export default App;
