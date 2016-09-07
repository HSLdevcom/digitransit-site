import React from 'react';
import { RouteHandler } from 'react-router';
import Typography from 'typography';
import { FrontPagePanels } from '../_components'
var typography = new Typography();

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <FrontPagePanels {...this.props}/>
        <div className="join-to-digitransit-content">
          <RouteHandler typography={typography} {...this.props}/>
        </div>
      </div>
    );
  }
});
