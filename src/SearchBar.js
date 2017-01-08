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
    if(key === keyCodes.ENTER) {
      if(this.props.search) {
        this.props.search(e.target.value)
      }
    }
  }

  onChange(e) {
    if(this.props.filter) {
      this.props.filter(e.target.value);
    }
  }

  render() {
    return (
      <div>
        <input 
          type="text" 
          placeholder={this.props.defaultText}
          onKeyDown={this.onKeyDown.bind(this)}
          onChange={this.onChange.bind(this)}
           />
      </div>
    );
  }
}

export default SearchBar;