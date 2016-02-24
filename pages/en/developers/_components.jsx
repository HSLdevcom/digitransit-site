import React from 'react';
import { RouteHandler, Link, State } from 'react-router';

const getDockerInfo = (props) => {

  if(typeof props.dockerImageName != "undefined") {
    return (<div>
        <h2>Docker</h2>
        <p>The resulting Docker image is called <strong>{ props.dockerImageName }</strong> and it is available at  <a href={ "https://hub.docker.com/r/" + props.dockerImageName }>DockerHub</a>.</p>
        <p>For More information about docker see <a href="../getting-started/#docker">docker info</a></p>
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
        console.log(asset)
        return (<tr><td>{ asset }</td><td><a href={ props.assets[asset] }>{ props.assets[asset] }</a></td></tr>);
  });
  return (<div>
    <h2>Project assets</h2>
    <table>
      <tr><th>Asset</th><th>Url</th></tr>
      { assets }
    </table>
  </div>);
  }
  return (<span></span>);
}

module.exports = {
  "DockerInfo": getDockerInfo,
  "TechnologiesInfo": getTechnologiesInfo,
  "Assets": getAssets
}