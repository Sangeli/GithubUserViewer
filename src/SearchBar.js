import React, { Component } from 'react';

const keyCodes = {
  ENTER: 13,
  ESCAPE: 27,
  UP: 38,
  DOWN: 40
};

class SearchBar extends Component {

  onKeyDown(e) {
    const key = e.keyCode;
    if(key == keyCodes.ENTER) {
      this.props.search(e.target.value)
    }
  }

  render() {
    return (
      <div>
        <input 
          type="text" 
          id="user-search-bar"
          placeholder={'Search for Users'}
          onKeyDown={this.onKeyDown.bind(this)}
           />
      </div>
    );
  }
}

export default SearchBar;