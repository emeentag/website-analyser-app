import scss from './style.scss'

import React from 'react'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import AppConfig from '../../config/AppConfig'
import _ from 'lodash'

var pageName = 'Home';

@withRouter
export default class Container extends React.Component {

  constructor(props) {
    super(props);
  }

  getPageName() {
    let pageName = 'Serdar';

    return pageName;
  }

  generateRoutes() {
    let routes = AppConfig.ROUTES.map((route, index) => (
      <Route key = { index } path={ route.path } exact={ route.exact } component={ route.component } />
    ));

    return routes;
  }

  render() {

    console.log(this.getPageName())
    console.log(pageName)

    return (
      <div class="row page-container">
        <div class="current-page">
          <Switch>
            { this.generateRoutes() }
          </Switch>
        </div>
      </div>
    )
  }
}