import React from 'react';
import { RouteHandler, Link, State } from 'react-router';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import colorPairsPicker from 'color-pairs-picker';
import chroma from 'chroma-js';
import { link } from 'gatsby-helpers';

import typography from 'utils/typography';
import { FrontPageHeader, FrontPagePanels, FrontPageNews } from './_components';

const { rhythm, fontSizeToPx } = typography;

const prefixer = require('react-style-normalizer');

module.exports = React.createClass({
  mixins: [State],
  getInitialState: function() {
    return({
      mobileMenuOpen: false
    })
  },

  componentDidMount: function () {
    if (this.props.page.data.redirect) {
      window.location = this.props.page.data.redirect;
    }
  },

  render: function() {
    var urlPrefix = "";
    var potentialLocale = this.props.page.path.substring(0, 4) //top level directory specifies language
    var locale = 'fi'
    if (potentialLocale === '/en/') {
       locale = 'en'
    } else if (potentialLocale === '/dev') {
      locale = 'en'
    }
    var localePrefix =(locale==='fi' ? '/' : '/en/')
    var i18n = this.props.config.i18n[locale]

    const mobileMenu =
      <div style={prefixer({
        position: "fixed",
        backgroundColor: this.props.config.headerColor,
        width: "100vw",
        top: 59,
        lineHeight: rhythm(2),
        fontSize: rhythm(0.75),
        left: 0,
        textAlign: "center"
      })}>
        <span style={{margin: rhythm(0.5)}}><a href="/" style={prefixer({margin: rhythm(0.5), color: "#fff", textDecoration: "none"})} hrefLang="fi">FI</a></span>
        <span style={{margin: rhythm(0.5)}}><a href="/en/" style={prefixer({margin: rhythm(0.5), color: "#fff", textDecoration: "none"})} hrefLang="en">EN</a></span><br/>
        <a href={`${localePrefix}#users`} style={prefixer({margin: rhythm(0.5), color: "#fff", textDecoration: "none"})}>{i18n.users}</a><br/>
        <Link to="/en/developers/" style={prefixer({margin: rhythm(0.5), color: "#fff", textDecoration: "none"})}>{i18n.developers}</Link><br/>
        <a href={`${localePrefix}#municipalities`} style={prefixer({margin: rhythm(0.5), color: "#fff", textDecoration: "none"})}>{i18n.muncipalities}</a><br/>

      </div>


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
        <nav
          style={prefixer({
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
            fontWeight: 500,
          })}
        >
          <Breakpoint minWidth={750}>
            {/* Convert to Link after upgrading to ract-router 1.0
              users and muncipalities are inter page links, they are only shown when on front page
            */}
            <a href={`${localePrefix}#users`} style={prefixer({margin: rhythm(0.5), color: "#fff", textDecoration: "none"})}>{i18n.users}</a>
            <Link to={`${urlPrefix}/en/developers/`} style={prefixer({margin: rhythm(0.5), color: "#fff", textDecoration: "none"})}>{i18n.developers}</Link>
            <a href={`${localePrefix}#municipalities`} style={prefixer({margin: rhythm(0.5), color: "#fff", textDecoration: "none"})}>{i18n.muncipalities}</a>
            <span style={{margin: rhythm(0.5)}}>|</span>
            <span style={{margin: rhythm(0.5)}}><a style={prefixer({margin: rhythm(0.5), color: "#fff", textDecoration: "none"})} href="/" hrefLang="fi">FI</a></span>
            <span style={{margin: rhythm(0.5)}}><a style={prefixer({margin: rhythm(0.5), color: "#fff", textDecoration: "none"})} href="/en/" hrefLang="en">EN</a></span>
          </Breakpoint>
          <Breakpoint maxWidth={750}>
            {/* Convert to Link after upgrading to ract-router 1.0 */}
            <svg
              id="icon-icon_menu"
              viewBox="0 0 1024 1024"
              style={{
                height: "2em",
                fill: "#fff",
                marginRight: rhythm(0.5),
                marginTop: "-0.25em",
                cursor: "pointer",
              }}
              onClick={() => this.setState({mobileMenuOpen: !this.state.mobileMenuOpen})}
            >
            	<title>icon_menu</title>
            	<path class="path1" d="M51.193 204.793h921.614c28.279 0 51.2 22.925 51.2 51.204 0 28.275-22.921 51.2-51.2 51.2h-921.614c-28.279 0-51.2-22.925-51.2-51.2 0-28.279 22.921-51.204 51.2-51.204z"></path>
            	<path class="path2" d="M51.193 460.796h921.614c28.279 0 51.2 22.925 51.2 51.204 0 28.275-22.921 51.2-51.2 51.2h-921.614c-28.279 0-51.2-22.925-51.2-51.2 0-28.279 22.921-51.204 51.2-51.204z"></path>
            	<path class="path3" d="M51.193 716.804h921.614c28.279 0 51.2 22.925 51.2 51.2 0 28.279-22.921 51.204-51.2 51.204h-921.614c-28.279 0-51.2-22.925-51.2-51.204 0-28.275 22.921-51.2 51.2-51.2z"></path>
            </svg>
            { this.state.mobileMenuOpen ? mobileMenu : <span/> }
          </Breakpoint>
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
              <img src={`${urlPrefix}/logo.png`} style={{height: "100%", padding: 7, margin: 0, paddingLeft: rhythm(1)}}/>
            </Link>
          </div>
        </div>
        {this.props.page.data.isFront || this.props.page.path == `${urlPrefix}/`  ? <FrontPageHeader {...this.props}/> : <div style={{height: `calc(${rhythm(1.5)} + 23px)`}}/>}
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
        {this.props.page.data.isFront || this.props.page.path == `${urlPrefix}/`  ? <FrontPageNews title={i18n.news} locale={locale} {...this.props}/> : null}
        {this.props.page.data.isFront || this.props.page.path == `${urlPrefix}/`  ? <FrontPagePanels {...this.props}/> : null}
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
          <img src="/hsl-logo.png"  style={prefixer({margin: "2em 2em", filter: "brightness(2)", WebkitFilter: "brightness(2)"})}/>
          <img src="/livi-logo.png" style={prefixer({margin: "2em 2em", filter: "brightness(2)", WebkitFilter: "brightness(2)"})}/>
          </div>
          <div style={{padding: "1em", color: "white", fontSize: 14}}>
            © Digitransit 2015
          </div>
        </div>
      </div>
    );
  }
});
