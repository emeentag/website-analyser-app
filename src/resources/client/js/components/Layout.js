import React from 'react';
import Container from './Container/Container';
import { BrowserRouter as Router } from 'react-router-dom';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
  }
    
  render() {
    return (
      <Router basename="/">
        <div class="container-fluid layout">
          <Container />
        </div>
      </Router>
    );
  }
}