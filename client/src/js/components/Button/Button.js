import scss from './style.scss';

import React from 'react';
import Loader from '../Loader/Loader';

export default class Button extends React.Component {

  render() {
    return (
      <div class="button-container">
        <button className={"btn " + this.props.type} style={this.props.styleButton} onClick={this.props.onClick} ref={(element) => { this.button = element }}>
          <span style={{opacity: (this.props.loading ? 0 : 1)}}>{this.props.name}</span>
        </button>
        <Loader loading={this.props.loading} containerStyle={this.props.loaderContainerStyle} loaderStyle={this.props.loaderLoaderStyle} />
      </div> 
    );
  }
}