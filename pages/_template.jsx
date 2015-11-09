import React from 'react';
import { RouteHandler, Link, State } from 'react-router';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import colorPairsPicker from 'color-pairs-picker';
import chroma from 'chroma-js';
import includes from 'underscore.string/include';
import { link } from 'gatsby-helpers';

import typography from 'utils/typography';
import { FrontPagePanel } from './_components';

const { rhythm, fontSizeToPx } = typography;



module.exports = React.createClass({
  mixins: [State],
  render: function() {
    var activeHeaderColors, darker, docsActive, examplesActive, headerColors, ref1, ref2, routes, urlPrefix;
    headerColors = colorPairsPicker(this.props.config.headerColor, {
      contrast: 5.5
    });
    darker = chroma(this.props.config.headerColor).darken(9).hex();
    activeHeaderColors = colorPairsPicker(darker, {
      contrast: 7
    });
    if (__GH_PAGES__) {
      urlPrefix = this.props.config.ghPagesURLPrefix;
    } else {
      urlPrefix = "";
    }
    routes = this.getRoutes().map(function(route) {
      return route.path;
    });
    docsActive = (routes.indexOf(urlPrefix + "/docs/") >= 0);
    examplesActive = (routes.indexOf(urlPrefix + "/examples/") >= 0);

    const panels = this.props.page.data.panels.map((panel) => <FrontPagePanel {... panel}/>)

    return (
      <div>
        <div
          id="header-image"
          style={{
            position: "relative",
            maxWidth: 2048,
            margin: "0 auto"
          }}
        >
          <img id="header-logo" src="logo.png"/>
          <h1 id="header-text">
            Täällä tehdään uuden ajan matkaopasta. Jätä jälkesi.
          </h1>
          <nav
            style={{
              fontSize: 15,
              textTransform: "uppercase",
              // .Käyttäjille________Kehittäjille_______kunnille {
              //   text-transform: uppercase;
              //   line-height: 2.667;
              //   text-align: right;
              //   position: absolute;
              //   left: 734.938px;
              //   top: 32.498px;
              //   z-index: 17;
              // }
              // .FI_____SV_____EN
              //   line-height: 2.667;
              //   position: absolute;
              //   left: 1151.937px;
              //   top: 33.998px;
              //   z-index: 14;
              // }
            }}
          >
            Käyttäjille
            Kehittäjille
            Kunnille


          </nav>
        </div>
        <div
          style={{
            position: "relative",
            background: "#eef1f3",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img src="hsl-logo.png"  style={{margin: "2em 2em"}}/>
          <img src="livi-logo.png" style={{margin: "2em 2em"}}/>
        </div>
        {panels}
        <div
          style={{
            backgroundImage: 'url("Aikataulu.png")',
            height: 552,
            maxWidth: 1440,
            margin: "0 auto"
          }}
        />
        <div
          style={{
            backgroundImage: 'url("Footer.png")',
            height: 230,
            maxWidth: 1440,
            margin: "0 auto"
          }}
        />
      </div>
    );
  }
});
