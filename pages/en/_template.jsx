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
        <div style={{
          position: "fixed",
          width: "100%",
          zIndex: 1,
          height: `calc(${rhythm(1.5)} + 23px)`,
          backgroundColor: this.props.config.headerColor,
        }}>
          <div style={{maxWidth: 950, height: "100%", margin: "0 auto"}}>
            <Link to={`${urlPrefix}/`}>
              <img src={`${urlPrefix}/logo.png`} style={{height: "100%", padding: 7, margin: 0, paddingLeft: rhythm(1)}}/>
            </Link>
          </div>
        </div>
        {this.props.page.path == `${urlPrefix}/` ? <FrontPage {...this.props}/> : <div style={{height: `calc(${rhythm(1.5)} + 23px)`}}/>}
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
          <div style={prefixer({
            width: 950,
            maxWidth: "80vw",
            magin: "0 auto",
            borderBottom: "solid 1px #5c5c5c",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          })}>
          <img src={`${urlPrefix}/hsl-logo.png`}  style={prefixer({margin: "2em 2em", filter: "brightness(2)", WebkitFilter: "brightness(2)"})}/>
          <img src={`${urlPrefix}/livi-logo.png`} style={prefixer({margin: "2em 2em", filter: "brightness(2)", WebkitFilter: "brightness(2)"})}/>
          </div>
          <div style={{padding: "1em", color: "white", fontSize: 14}}>
            © Digitransit 2015
          </div>
        </div>
      </div>
    );
  }
});
