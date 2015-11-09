import React from 'react';
import {Container, Grid, Breakpoint, Span} from 'react-responsive-grid';

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


export class FrontPagePanel extends React.Component {
  render() {
    const links = this.props.links.map((link) =>
      <div>
        <a href={link.url}>
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
              background: this.props.background,
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
              <h2>
                {this.props.title}
              </h2>
              <div>
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
              background: this.props.background,
              minHeight: 500,
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
              <h2 style={{textAlign: "center"}}>
                {this.props.title}
              </h2>
              <div>
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
