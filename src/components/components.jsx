import React from "react";
import {
  Container,
  Grid,
  Breakpoint,
  Span
} from "@mjaakko/react-responsive-grid";
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

const getPanelImage = (image, swapped, small) => {
  return (
    <img
      src={image}
      style={prefixer({
        maxWidth: "80vw",
        width: 360,
        maxHeight: 360,
        marginLeft: 45,
        marginRight: 45,
        marginTop: "1em",
        marginBottom: "1em",
        order: small || swapped ? -1 : 2
      })}
    />
  );
};

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

export class FrontPagePanels extends React.Component {
  render() {
    return (
      <div>
        {this.props.panels.map(panel => (
          <FrontPagePanel {...panel} />
        ))}
      </div>
    );
  }
}

class FrontPagePanel extends React.Component {
  render() {
    const links = this.props.links.map(link => {
      if (link.url.substring(0, 4) == "http") {
        return (
          <div>
            <a
              href={link.url}
              style={prefixer({
                textDecoration: "none",
                marginTop: rhythm(0.5),
                fontSize: 15,
                fontWeight: 500,
                color: this.props.textColor ? this.props.textColor : "#fff"
              })}
            >
              {link.title}&nbsp;»
            </a>
          </div>
        );
      } else {
        return (
          <div>
            <Link
              to={link.url}
              style={prefixer({
                textDecoration: "none",
                marginTop: rhythm(0.5),
                fontSize: 15,
                fontWeight: 500,
                color: this.props.textColor ? this.props.textColor : "#fff"
              })}
            >
              {link.title}&nbsp;»
            </Link>
          </div>
        );
      }
    });

    return (
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
              paddingBottom: "1.5em"
            })}
          >
            {getPanelImage(
              this.props.image.publicURL,
              this.props.swapped,
              false
            )}
            <div
              style={{
                maxWidth: 465,
                marginLeft: this.props.swapped ? 60 : 30,
                marginRight: this.props.swapped ? 30 : 60,
                marginTop: "1em",
                marginBottom: "1em"
              }}
            >
              <h2
                style={{
                  color: this.props.textColor ? this.props.textColor : "#fff"
                }}
              >
                {this.props.title}
              </h2>
              <div style={{ paddingBottom: "1em" }}>{this.props.body}</div>
              <div>{links}</div>
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
              paddingBottom: "1.5em"
            })}
          >
            <div
              style={{
                maxWidth: 465,
                marginLeft: rhythm(1),
                marginRight: rhythm(1),
                marginTop: "1em",
                marginBottom: "1em"
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  color: this.props.textColor ? this.props.textColor : "#fff"
                }}
              >
                {this.props.title}
              </h2>
              <div style={{ paddingBottom: "1em" }}>{this.props.body}</div>
              <div>{links}</div>
            </div>
            {getPanelImage(
              this.props.image.publicURL,
              this.props.swapped,
              true
            )}
          </div>
        </Breakpoint>
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

const getImage = url => {
  if (typeof url == "undefined") {
    return <span />;
  }
  return <img src={url} />;
};

export const ArchitectureHeader = props => {
  if (!props.description) {
    return <span />;
  }

  let imageFile = "architecture.svg";

  // IE doesn't fully support SVG:s made with draw.io
  if (
    window.navigator.userAgent.indexOf("MSIE") !== -1 ||
    window.navigator.appVersion.indexOf("Trident/") > 0
  ) {
    imageFile = "architecture.png";
  }

  // We'll have to use full path as image location. By just using "./architecture.svg", browser won't update image
  // when moving from page to page if image name is the same
  const image = require("../pages" + props.slug + imageFile);

  return (
    <div>
      <p>{props.description.info}</p>
      {getImage(props.description.img)}
      <span style={{ float: "right", "font-size": "0.8em;" }}>
        <a href={"https://www.draw.io/?url=" + props.description.architecture}>
          edit architecture image
        </a>
      </span>
      <h2>Service Architecture</h2>
      <img src={image} />
    </div>
  );
};

export const ReplitEmbed = props => {
  if (!props.replit) {
    return <span />;
  }

  const getEmbed = example => {
    if (
      example == null ||
      example.title == null ||
      example.height == null ||
      example.url == null
    ) {
      return null;
    }

    return (
      <div>
        <h3>{example.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: example.description }} />
        <iframe
          height={example.height}
          width="100%"
          src={example.url + "?lite=true"}
          frameBorder="no"
          allowtransparency="true"
          allowfullscreen="true"
          sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"
        />
      </div>
    );
  };

  let note = null;
  if (props.replit.note) {
    note = <div dangerouslySetInnerHTML={{ __html: props.replit.note }} />;
  }

  let title = "Test the API";
  if (props.replit.title) {
    title = props.replit.title;
  }

  const list = props.replit.embeds.map(getEmbed);

  return (
    <div>
      <h2>{title}</h2>
      {note}
      {list}
    </div>
  );
};

export class TableOfContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };

    this.update = this.update.bind(this);
  }

  update(e) {
    e.preventDefault();
    this.setState(state => {
      console.log("Set state to " + !state.collapsed);
      return { collapsed: !state.collapsed };
    });
  }

  render() {
    if (
      !this.props.data.markdownRemark.frontmatter.toc ||
      !this.props.data.markdownRemark.tableOfContents
    ) {
      return null;
    }

    return (
      <div
        style={{
          display: "inline-block",
          border: "1px",
          borderStyle: "solid",
          borderColor: "black",
          background: "#f9f9f9",
          padding: "8px",
          marginBottom: "8px"
        }}
      >
        <p style={{ textAlign: "center", marginBottom: "0px" }}>
          <b>Table of contents</b>
          {" ["}
          <a href="javascript:;" onClick={this.update}>
            {this.state.collapsed ? "hide" : "show"}
          </a>
          {"]"}
        </p>
        <div
          class="toc"
          style={{ display: this.state.collapsed ? "block" : "none" }}
          dangerouslySetInnerHTML={{
            __html: this.props.data.markdownRemark.tableOfContents
          }}
        />
      </div>
    );
  }
}
