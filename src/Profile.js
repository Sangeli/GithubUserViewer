import React, { Component } from 'react';


class Profile extends Component {
  render() {
    return (
      <div className="media">
        <img 
          src={this.props.avatarUrl}
        />
      </div>
    )
  }
}


export default Profile;