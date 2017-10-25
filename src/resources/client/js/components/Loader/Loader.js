import scss from './style.scss';

import React from 'react';

export default class Loader extends React.Component {

  getThreeBallLoader() {
    return (
      <div className={"la-ball-fall loader"} style={this.props.loaderStyle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  showMessagePane(message) {
    return (
      <div class="loader-message"><span class="message-container"><i class="glyphicon glyphicon-exclamation-sign"></i><span>{message}</span></span></div>
    )
  }

  render() {
    return (
      <div className={"loader-container" + ((this.props.loading || this.props.showMessage) ? " active" : "")} style={this.props.containerStyle}>
        {this.props.showMessage ? 
          this.showMessagePane(this.props.message) : this.getThreeBallLoader()
        }
      </div>
    );
  }
}