import React from 'react';
import {Container, Grid, Breakpoint, Span} from 'react-responsive-grid';
import { RouteHandler, Link, State } from 'react-router';
import { rhythm, fontSizeToPx } from 'utils/typography';
const prefixer = require('react-style-normalizer');


const getImage = (image, swapped, small) => {
  return (<img
    src={image}
    style={prefixer({
      maxWidth: "80vw",
      width: 360,
      maxHeight: 360,
      marginLeft: 45,
      marginRight: 45,
      marginTop: "1em",
      marginBottom: "1em",
      order: small || swapped ? -1 : 2,
    })}
  />);
};

export class FrontPageHeader extends React.Component {
  render() {
    return(
      <div>
        <div
          id="header-image"
          style={{
            position: "relative",
            maxWidth: 2048,
            margin: "0 auto",
            zIndex: 2
          }}
        >
          <img id="header-logo" src="/logo.png"/>
          <h1 id="header-text"> {this.props.page.data.headerText} </h1>
        </div>
        <div
          style={prefixer({
            position: "relative",
            background: "#eef1f3",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          })}
        >
          <img src="/hsl-logo.png"  style={{margin: "2em 2em"}}/>
          <img src="/livi-logo.png" style={{margin: "2em 2em"}}/>
        </div>
      </div>
    )
  }
}

export class FrontPagePanels extends React.Component {
  render() {
    return(
      <div>
        {this.props.page.data.panels.map((panel) => <FrontPagePanel {... panel}/>)}
      </div>
    )
  }
}

class FrontPagePanel extends React.Component {
  render() {
    const links = this.props.links.map((link) => {
      if (link.url.substring(0, 4) == "http") {
        return(
          <div>
            <a
              href={link.url}
              style={prefixer({
                textDecoration: "none",
                marginTop: rhythm(0.5),
                fontSize: 15,
                fontWeight: 500,
                color: this.props.textColor ? this.props.textColor : "#fff",
              })}
            >
              {link.title}&nbsp;»
            </a>
          </div>
        )
      }
      else {
        return(
          <div>
            <Link
              to={link.url}
              style={prefixer({
                textDecoration: "none",
                marginTop: rhythm(0.5),
                fontSize: 15,
                fontWeight: 500,
                color: this.props.textColor ? this.props.textColor : "#fff",
              })}
            >
              {link.title}&nbsp;»
            </Link>
          </div>
        )
      }
    }
  );

    return(
      <div>
        <Breakpoint minWidth={1020} widthMethod="componentWidth">
          <div
            id={this.props.id}
            style={prefixer({
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              color: this.props.textColor ? this.props.textColor : "#fff",
              background: this.props.background,
              fontWeight: 300,
              WebkitFontSmoothing: "antialiased",
              minHeight: 500,
              paddingTop: "1.5em",
              paddingBottom: "1.5em",
            })}
          >
            {getImage(this.props.image, this.props.swapped, false)}
            <div
              style={{
                maxWidth: 465,
                marginLeft: this.props.swapped ? 60 : 30,
                marginRight: this.props.swapped ? 30 : 60,
                marginTop: "1em",
                marginBottom: "1em",
              }}
            >
              <h2 style={{color: this.props.textColor ? this.props.textColor : "#fff"}}>
                {this.props.title}
              </h2>
              <div style={{paddingBottom: "1em"}}>
                {this.props.body}
              </div>
              <div>
                {links}
              </div>
            </div>
          </div>
        </Breakpoint>
        <Breakpoint maxWidth={1020} widthMethod="componentWidth">
          <div
            style={prefixer({
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: this.props.textColor ? this.props.textColor : "#fff",
              background: this.props.background,
              minHeight: 500,
              fontWeight: 300,
              WebkitFontSmoothing: "antialiased",
              paddingTop: "1.5em",
              paddingBottom: "1.5em",
            })}
          >
            <div
              style={{
                maxWidth: 465,
                marginLeft: rhythm(1),
                marginRight: rhythm(1),
                marginTop: "1em",
                marginBottom: "1em",
              }}
            >
              <h2 style={{textAlign: "center", color: this.props.textColor ? this.props.textColor : "#fff"}}>
                {this.props.title}
              </h2>
              <div style={{paddingBottom: "1em"}}>
                {this.props.body}
              </div>
              <div>
                {links}
              </div>
            </div>
            {getImage(this.props.image, this.props.swapped, true)}
          </div>
        </Breakpoint>
      </div>
    );
  }
}
