import React from 'react';
import { RouteHandler, Link, State } from 'react-router';

const getDockerInfo = (props) => {

  if(typeof props.docker != "undefined") {
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

const getTechnologiesInfo = (props) => {
  if(typeof props.technologies != "undefined") {

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

const getAssets = (props) => {
  if(typeof props.assets != "undefined") {
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

const getArchitectureHeader = (props) => {

  if (typeof props.description == "undefined") {
    return (<span></span>);
  }
  
  let imageFile = "/architecture.svg";

  // IE doesn't fully support SVG:s made with draw.io
  if(window.navigator.userAgent.indexOf('MSIE')!==-1
  || window.navigator.appVersion.indexOf('Trident/') > 0){
    imageFile = "/architecture.png";
  }

  // We'll have to use full path as image location. By just using "./architecture.svg", browser won't update image
  // when moving from page to page if image name is the same
  const image = window.location.pathname + imageFile;

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

const getReplitEmbed = (props) => {
  if (typeof props.replit == "undefined") {
    return (<span></span>);
  }

  const getEmbed = (example) => {
     if (props.replit[example].height == null || props.replit[example].url == null) {
       return null;
     }

     return (
              <div>
                <h3>{ example }</h3>
                <p dangerouslySetInnerHTML={{__html: props.replit[example].description }} />
                <iframe height={props.replit[example].height} width="100%" src={props.replit[example].url + "?lite=true"} frameBorder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals">Failed to load {props.replit[example].url}</iframe>
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

module.exports = {
  "DockerInfo": getDockerInfo,
  "TechnologiesInfo": getTechnologiesInfo,
  "Assets": getAssets,
  "ArchitectureHeader": getArchitectureHeader,
  "ReplitEmbed": getReplitEmbed
}
