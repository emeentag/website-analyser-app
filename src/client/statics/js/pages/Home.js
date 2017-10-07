import scss from './style.scss';

import React from 'react';
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { doSearch } from '../actions/AnalyseActions';
import AnalyseDetails from '../components/AnalyseDetails/AnalyseDetails';

@withRouter
@connect((props) => {
  return {
    analyseResult: props.AnalyseReducer.analyseResult,
    isAnalysing: props.AnalyseReducer.isAnalysing,
    responseStatus: props.AnalyseReducer.responseStatus,
    error: props.AnalyseReducer.error
  };
})
export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.isAnalysing) {
      return true;
    }

    return false;
  }


  componentWillUpdate(nextProps, nextState) {

  }

  doSearch(e) {
    e.preventDefault();
    var ajax = axios({
      url: '/analyse',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ webpage: this.searchInput.value })
    });

    this.props.dispatch(doSearch(ajax))
  }

  render() {
    return (
      <div class="section">
        <div class="row">
          <div class="col-sm-12 home-page">
            <div class="title-container col-sm-12">
              <h1>
                <div class="col-sm-12 home-title">Website Analyser</div>
                <div class="col-sm-12 home-desc">You can analyse a webpage by typing it's url here.</div>
              </h1>
            </div>
            <div class="search-container">
              <form action="#" method="POST" onSubmit={this.doSearch.bind(this)}>
                <div class="form-group">
                  <div class="element-container">
                    <input type="text"
                      id="search"
                      name="search"
                      class="form-control search-input"
                      required autoFocus ref={(element) => { this.searchInput = element }}
                      placeholder="Type website domain here."
                    />
                    <div class="btn-analyse">
                      <button type='submit' class='btn btn-primary'>Analyse</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="row search-details-container">
          {this.props.analyseResult != null
            ?
            <AnalyseDetails analyseResult={this.props.analyseResult} />
            :
            (this.props.error
              ?
              <div class="col-sm-12 home-desc error-message">Error occured. Code: <strong>{this.props.responseStatus}</strong></div>
              :
              null)}
        </div>
      </div>
    )
  }
}