import scss from './style.scss';

import React from 'react';
import _ from 'lodash';

import LinkTable from '../LinkTable/LinkTable';

var getLinkCount = (links) => {
  var count = _.countBy(links, (value) => {
    return value.type == 'ext';
  });
  
  return count;
}

var getAccessibleLinkCount = (links) => {
  var count = _.countBy(links, (value) => {
    return value.accessible;
  })

  return count;
}

const AnalysedLinkItem = (props) => {

  var linkCount = getLinkCount(props.links); 
  var accessibleLinkCount = getAccessibleLinkCount(props.links);
  
  return (
    <div class="col-sm-12 link-panel">
      <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="heading-1">
          <h4 class="panel-title">
            <i class="glyphicon glyphicon-menu-right"></i>
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
              <span>This webpage contains <strong>{ linkCount.true | 0 } external</strong>, 
              <strong>{ linkCount.false | 0 } internal</strong> and
              <strong> { accessibleLinkCount.false | 0 }</strong> <strong>inaccessible</strong> links.</span>
            </a>
          </h4>
        </div>
        <div id="collapse-1" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading-1">
          <div class="panel-body">
            <LinkTable links={props.links} />
          </div>
        </div>
      </div>
    </div>
  );
}

const AnalyseItem = (props) => {
  return (
    <div class="col-sm-12 analyse-item">
      <i class="glyphicon glyphicon-menu-right"></i>
      <p class="lead"><span>{props.preText + " "}</span> <span><strong>{props.postText}</strong></span></p>
    </div>
  )
}

export default class AnalyseDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="col-sm-12">
        <div class="jumbotron">
          <h1 class="display-3">{this.props.analyseResult.title}</h1>
          <AnalyseItem preText="This webpage builded with" postText={this.props.analyseResult.version} />
          <AnalyseItem preText="This webpage contains headings" postText={
            "H1: " + this.props.analyseResult.headings.h1 +
            ", H2: " + this.props.analyseResult.headings.h2 +
            ", H3: " + this.props.analyseResult.headings.h3 +
            ", H4: " + this.props.analyseResult.headings.h4 +
            ", H5: " + this.props.analyseResult.headings.h5 +
            ", H6: " + this.props.analyseResult.headings.h6} />
          <AnalyseItem preText="This webpage" postText={(this.props.analyseResult.loginForm ? "contains " : "doesn't contain ") + "a login form."} />
          <AnalysedLinkItem links={this.props.analyseResult.links} />
        </div>
      </div>
    )
  }
}