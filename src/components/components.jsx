import React from "react";

import logo from "../pages/logo.png";
import hslLogo from "../pages/hsl-logo.png";

import typography from "../utils/typography";
const prefixer = require("react-style-normalizer");

const { rhythm, fontSizeToPx } = typography;

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
