import style from './style.scss';

import React from 'react';

export default class ThreeDots extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showMessage: false
    };
  }

  clickHandler(e) {
    this.setState({
      showMessage: !this.state.showMessage
    });
  }

  render() {
    return(
      <div class="message-container">
        <span class={"message" + (this.state.showMessage ? " message-active" : "") } >{ this.props.message }</span>
        <button type="button" class="btn btn-default" onClick={ this.clickHandler.bind(this) } >...</button>      
      </div>
    )
  }
}