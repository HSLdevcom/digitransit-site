import React from 'react';
import {Container, Grid, Breakpoint, Span} from '@mjaakko/react-responsive-grid';
import { Link } from 'gatsby';

import logo from "../pages/logo.png";
import hslLogo from "../pages/hsl-logo.png";
import liviLogo from "../pages/livi-logo.png";

import typography from '../utils/typography';
const prefixer = require('react-style-normalizer');

const { rhythm, fontSizeToPx } = typography

const getPanelImage = (image, swapped, small) => {
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
          <img id="header-logo" src={logo} />
          <h1 id="header-text">{this.props.headerText}</h1>
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
          <img src={hslLogo} style={{margin: "2em 2em"}}/>
          <img src={liviLogo} style={{margin: "2em 2em"}}/>
        </div>
      </div>
    )
  }
}

export class FrontPagePanels extends React.Component {
  render() {
    return(
      <div>
        {this.props.panels.map((panel) => <FrontPagePanel {... panel}/>)}
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
            {getPanelImage(this.props.image.publicURL, this.props.swapped, false)}
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
            {getPanelImage(this.props.image.publicURL, this.props.swapped, true)}
          </div>
        </Breakpoint>
      </div>
    );
  }
}

export const DockerInfo = (props) => {

  if(props.docker) {
    let travisInfo = "";
    if (props.docker.travisBuild) {
      travisInfo = <span> You might also want to take a look at the <a href={"https://travis-ci.org/HSLdevcom/" + props.docker.travisBuild}>Travis build and configuration</a>.</span>;
    }
    return (<div>
        <h2>Docker image</h2>
        <p>
          The resulting Docker image is called <strong>{ props.docker.imageName }</strong> and
          it is available at <a href={ "https://hub.docker.com/r/" + props.docker.imageName }> DockerHub</a>.
          The image can be built using this <a href={props.docker.buildScript}>build script</a>. 
          {travisInfo}
        </p>
        <p>
          To run Docker container, run:
        </p>
        <pre>
          { props.docker.runContainer }
        </pre>
        <p>
          To access Docker container:
        </p>
        <pre>
          { props.docker.accessContainer }
        </pre>
        <p>
          For More information about how to use Docker see <a href="/en/developers/docker-guide/#docker">docker info</a>.
        </p>
    </div>);
  }
  return (<span></span>);
}

export const TechnologiesInfo = (props) => {
  if(props.technologies) {

    const getUrl = (tech) => {
      if (props.technologies[tech] != null) {
        return (<span>(<a href={ props.technologies[tech] }>{ props.technologies[tech] }</a>)</span>)
      }
      return null;
    }

    const list = Object.keys(props.technologies).map( (tech) => {
      return (<li>{ tech } { getUrl(tech) }</li>);
    });
    return (<div>
      <h2>Key technologies and specifications</h2>
      <ul>{ list }</ul>
    </div>);
  }
  return (<span></span>);
}

export const Assets = (props) => {
  if(props.assets) {
    const assets = Object.keys(props.assets).map( (asset) => {
        return (<tr><td>{ asset }</td><td><a href={ props.assets[asset] }>{ props.assets[asset] }</a></td></tr>);
  });
  return (<div>
    <h2>Project assets</h2>
    <table>
      <thead>
        <tr><th>Asset</th><th>Url</th></tr>
      </thead>
      <tbody>
        { assets }
      </tbody>
    </table>
  </div>);
  }
  return (<span></span>);
}

const getImage = (url) => {
  if (typeof url == "undefined") {
    return (<span></span>);
  }
  return (<img src={url}/>)
}

export const ArchitectureHeader = (props) => {

  if (!props.description) {
    return (<span></span>);
  }
  
  let imageFile = "architecture.svg";

  // IE doesn't fully support SVG:s made with draw.io
  if(window.navigator.userAgent.indexOf('MSIE')!==-1
  || window.navigator.appVersion.indexOf('Trident/') > 0){
    imageFile = "architecture.png";
  }

  // We'll have to use full path as image location. By just using "./architecture.svg", browser won't update image
  // when moving from page to page if image name is the same
  const image = require("../pages" + props.slug + imageFile);

  return (
    <div>
      <p>{props.description.info}</p>
      {getImage(props.description.img)}
      <span style={{"float": "right", "font-size": "0.8em;"}}><a href={"https://www.draw.io/?url=" + props.description.architecture}>edit architecture image</a></span>
      <h2>Service Architecture</h2>
      <img src={image}/>
    </div>
  );
}

export const ReplitEmbed = (props) => {
  if (!props.replit) {
    return (<span></span>);
  }

  const getEmbed = (example) => {
     if (props.replit[example] == null || props.replit[example].height == null || props.replit[example].url == null) {
       return null;
     }

     return (
              <div>
                <h3>{ example }</h3>
                <p dangerouslySetInnerHTML={{__html: props.replit[example].description }} />
                <iframe height={props.replit[example].height} width="100%" src={props.replit[example].url + "?lite=true"} frameBorder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
              </div>
            );
  };

  let note = null;
  if (props.replit.note) {
    note = <div dangerouslySetInnerHTML={{__html: props.replit.note }} />;
    delete props.replit.note; 
  }

  let title = "Test the API";
  if (props.replit.title) {
    title = props.replit.title;
    delete props.replit.title;
  }

  const list = Object.keys(props.replit).map(getEmbed);  

  return (
	<div>
	  <h2>{ title }</h2>
          { note }
          { list }
	</div>);
}

