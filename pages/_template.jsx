import React from 'react';
import { RouteHandler, Link, State } from 'react-router';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import colorPairsPicker from 'color-pairs-picker';
import chroma from 'chroma-js';
import includes from 'underscore.string/include';
import { link } from 'gatsby-helpers';

import typography from 'utils/typography';
import { FrontPage } from './_components';

const { rhythm, fontSizeToPx } = typography;



module.exports = React.createClass({
  mixins: [State],
  render: function() {
    var routes, urlPrefix;
    if (__GH_PAGES__) {
      urlPrefix = this.props.config.ghPagesURLPrefix;
    } else {
      urlPrefix = "";
    }
    routes = this.getRoutes().map(function(route) {
      return route.path;
    });


    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
        <nav
          style={{
            fontSize: 15,
            textTransform: "uppercase",
            position: "fixed",
            maxWidth: 720,
            zIndex: 3,
            textAlign: "right",
            padding: `${rhythm(3/4)} ${rhythm(1/2)}`,
            margin: "0 auto",
            left: 152,
            right: 0,
            color: "#fff",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          {/* Convert to Link after upgrading to ract-router 1.0 */}
          <a href={`${urlPrefix}/#users`} style={{margin: rhythm(0.5), color: "#fff", textDecoration: "none"}}>Käyttäjille</a>
          <Link to={`${urlPrefix}/developers/`} style={{margin: rhythm(0.5), color: "#fff", textDecoration: "none"}}>Kehittäjille</Link>
          <a href={`${urlPrefix}/#municipalities`} style={{margin: rhythm(0.5), color: "#fff", textDecoration: "none"}}>Kunnille</a>
          <span style={{margin: rhythm(0.5)}}>|</span>
          <span style={{margin: rhythm(0.5)}}>FI</span>
          <span style={{margin: rhythm(0.5)}}>SV</span>
          <span style={{margin: rhythm(0.5)}}>EN</span>


        </nav>
        <div style={{
          position: "fixed",
          width: "100%",
          zIndex: 1,
          height: `calc(${rhythm(1.5)} + 23px)`,
          backgroundColor: this.props.config.headerColor,
        }}>
          <div style={{maxWidth: 950, height: "100%", margin: "0 auto"}}>
            <Link to={`${urlPrefix}/`}>
              <img src={`${urlPrefix}/logo.png`} style={{height: "100%", padding: 5, margin: 0}}/>
            </Link>
          </div>
        </div>
        {this.props.page.path == `${urlPrefix}/` ? <FrontPage {...this.props}/> : <div style={{height: `calc(${rhythm(1.5)} + 23px)`}}/>}
        <Container
          style={{
            maxWidth: 950,
            width: "100%",
            padding: `${rhythm(1)} ${rhythm(1/2)}`,
            flex: "1",
          }}
        >
          <RouteHandler typography={typography} {...this.props}/>
        </Container>
        <div
          style={{
            width: "100%",
            background: "#333",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div style={{
            width: 950,
            borderBottom: "solid 1px #5c5c5c",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <img src={`${urlPrefix}/hsl-logo.png`}  style={{margin: "2em 2em", filter: "brightness(2)", WebkitFilter: "brightness(2)"}}/>
          <img src={`${urlPrefix}/livi-logo.png`} style={{margin: "2em 2em", filter: "brightness(2)", WebkitFilter: "brightness(2)"}}/>
          </div>
          <div style={{margin: "1em", color: "white", fontSize: 14}}>
            © Digitransit 2015
          </div>
        </div>
      </div>
    );
  }
});
