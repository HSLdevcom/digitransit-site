import React from 'react';
import {Container, Grid, Breakpoint, Span} from 'react-responsive-grid';
import { rhythm, fontSizeToPx } from 'utils/typography';


const getImage = (image, swapped, small) => {
  return (<img
    src={image}
    style={{
      maxWidth: 360,
      height: 360,
      marginLeft: 45,
      marginRight: 45,
      marginTop: "1em",
      marginBottom: "1em",
      order: small || swapped ? -1 : 2,
    }}
  />);
};

export class FrontPage extends React.Component {
  render() {
    const panels = this.props.page.data.panels.map((panel) => <FrontPagePanel {... panel}/>)

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
          <img id="header-logo" src="logo.png"/>
          <h1 id="header-text">
            Täällä tehdään uuden ajan matkaopasta. Jätä jälkesi.
          </h1>
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
      </div>
    )
  }
}

class FrontPagePanel extends React.Component {
  render() {
    const links = this.props.links.map((link) =>
      <div>
        <a
          href={link.url}
          style={{
            textDecoration: "none",
            marginTop: rhythm(0.5),
            fontSize: 15,
            fontWeight: 500,
            color: "#fff",
          }}
        >
          {link.title} »
        </a>
      </div>
    );

    return(
      <div>
        <Breakpoint minWidth={1020} widthMethod="componentWidth">
          <div
            style={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              background: this.props.background,
              fontWeight: 100,
              minHeight: 500,
              paddingTop: "1.5em",
              paddingBottom: "1.5em",
            }}
          >
            <div
              style={{
                maxWidth: 465,
                marginLeft: this.props.swapped ? 60 : 30,
                marginRight: this.props.swapped ? 30 : 60,
                marginTop: "1em",
                marginBottom: "1em",
              }}
            >
              <h2 style={{color: "#fff"}}>
                {this.props.title}
              </h2>
              <div style={{paddingBottom: "1em"}}>
                {this.props.body}
              </div>
              <div>
                {links}
              </div>
            </div>
            {getImage(this.props.image, this.props.swapped, false)}
          </div>
        </Breakpoint>
        <Breakpoint maxWidth={1020} widthMethod="componentWidth">
          <div
            style={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              background: this.props.background,
              minHeight: 500,
              fontWeight: 100,
              paddingTop: "1.5em",
              paddingBottom: "1.5em",
            }}
          >
            <div
              style={{
                maxWidth: 465,
                marginLeft: 60,
                marginRight: 60,
                marginTop: "1em",
                marginBottom: "1em",
              }}
            >
              <h2 style={{textAlign: "center", color: "#fff"}}>
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
