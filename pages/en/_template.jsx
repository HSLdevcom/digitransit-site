import React from 'react';
import { RouteHandler, Link, State } from 'react-router';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import colorPairsPicker from 'color-pairs-picker';
import chroma from 'chroma-js';
import { link } from 'gatsby-helpers';

import typography from 'utils/typography';
import { FrontPage } from './_components';

const { rhythm, fontSizeToPx } = typography;

const prefixer = require('react-style-normalizer');

module.exports = React.createClass({
  mixins: [State],
  getInitialState: function() {
    return({
      mobileMenuOpen: false
    })
  },


  render: function() {
    var urlPrefix = "";
    var routes = this.getRoutes().map(function(route) {
      return route.path;
    });

    return (
      <div
        ref="mainflex"
        style={ (typeof(navigator) != 'undefined' && (/Trident\/7\./).test(navigator.userAgent)) ?
          {
            height: "100%",
            width: "100%"
          }
          : prefixer({
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          })
        }
      >
        {this.props.page.path == `${urlPrefix}/en/` ? <FrontPage {...this.props}/> : <div style={{height: `calc(${rhythm(1.5)} + 23px)`}}/>}
        <Container
          style={prefixer({
            maxWidth: 950,
            width: "100%",
            padding: `${rhythm(1)} ${rhythm(1/2)}`,
            flex: "1",
          })}
        >
          <RouteHandler typography={typography} {...this.props}/>
        </Container>
        <div
          style={prefixer({
            width: "100%",
            background: "#333",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          })}
        >
        </div>
      </div>
    );
  }
});
