import scss from './style.scss';

import React from 'react';

const ExternalDefinition = (props) => (
  <span class="external-link">{props.text}</span>
);

const InternalDefinition = (props) => (
  <span class="internal-link">{props.text}</span>
);

export default class LinkTable extends React.Component {

  constructor(props) {
    super(props);
  }

  getLinkItems() {
    var links = this.props.links.map((link, index) => {
      return (
        <tr key={index}>
          <td>{link.address.substring(0, 35) + "..."}</td>
          <td>{link.type == 'ext' ?  <ExternalDefinition text='External'/> : <InternalDefinition text='Internal'/>}</td>
          <td>{link.accessible ? <InternalDefinition text='Yes'/> : <ExternalDefinition text='No'/>}</td>
        </tr>
      )
    });

    return links;
  }

  render() {
    return (
      <table class="table">
        <thead>
          <tr>
            <th>URL</th>
            <th>Type</th>
            <th>Accessibility</th>
          </tr>
        </thead>
        <tbody>
          {this.getLinkItems()}
        </tbody>
      </table>
    )
  }
}