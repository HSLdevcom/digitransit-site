import React from "react";
import { Link } from "gatsby";

import { PrismCode } from "react-prism";

import logo from "../pages/logo.png";
import hslLogo from "../pages/hsl-logo.png";

import typography from "../utils/typography";
const prefixer = require("react-style-normalizer");

const { rhythm, fontSizeToPx } = typography;

//Prism highlighting for docker commands
require("prismjs");
require("prismjs/components/prism-bash");

export class FrontPageHeader extends React.Component {
  render() {
    return (
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
          <img src={hslLogo} style={{ margin: "2em 2em" }} />
        </div>
      </div>
    );
  }
}

export const DockerInfo = props => {
  if (props.docker) {
    let travisInfo = "";
    if (props.docker.travisBuild) {
      travisInfo = (
        <span>
          {" "}
          You might also want to take a look at the{" "}
          <a
            href={"https://travis-ci.org/HSLdevcom/" + props.docker.travisBuild}
          >
            Travis build and configuration
          </a>
          .
        </span>
      );
    }
    return (
      <div>
        <h2>Docker image</h2>
        <p>
          The resulting Docker image is called{" "}
          <strong>{props.docker.imageName}</strong> and it is available at{" "}
          <a href={"https://hub.docker.com/r/" + props.docker.imageName}>
            {" "}
            DockerHub
          </a>
          . The image can be built using this{" "}
          <a href={props.docker.buildScript}>build script</a>.{travisInfo}
        </p>
        <p>
          To run Docker container, run:
          <br />{" "}
          <pre>
            <PrismCode className="language-bash">
              {props.docker.runContainer}
            </PrismCode>
          </pre>
        </p>
        <p>
          To access Docker container:
          <br />{" "}
          <pre>
            <PrismCode className="language-bash">
              {props.docker.accessContainer}
            </PrismCode>
          </pre>
        </p>
        <p>
          For More information about how to use Docker see{" "}
          <a href="/en/developers/docker-guide/#docker">docker info</a>.
        </p>
      </div>
    );
  }
  return <span />;
};

export const TechnologiesInfo = props => {
  if (props.technologies) {
    const getUrl = tech => {
      if (tech.url != null) {
        return (
          <span>
            (<a href={tech.url}>{tech.url}</a>)
          </span>
        );
      }
      return null;
    };

    const list = props.technologies.map(tech => {
      return (
        <li>
          {tech.title} {getUrl(tech)}
        </li>
      );
    });
    return (
      <div>
        <h2>Key technologies and specifications</h2>
        <ul>{list}</ul>
      </div>
    );
  }
  return <span />;
};

export const Assets = props => {
  if (props.assets) {
    const assets = props.assets.map(asset => {
      return (
        <tr>
          <td>{asset.title}</td>
          <td>
            <a href={asset.url}>{asset.url}</a>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <h2>Project assets</h2>
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Url</th>
            </tr>
          </thead>
          <tbody>{assets}</tbody>
        </table>
      </div>
    );
  }
  return <span />;
};