import React from "react";

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `

          /*th, td {
            border: 1px solid gray;
            padding: 3px;
          }*/

          blockquote:before {
            color: #ccc;
            font-size: 4em;
            line-height: 0.1em;
            margin-right: 0.25em;
            vertical-align: -0.4em;
          }
          blockquote p {
            margin: 0px;
          }
          pre {
            background: #f9f9f9;
          }
          .large-link > a {
            display: block;
            font-size: 24px;
            text-decoration: none;
            line-height: 38px;
            font-weight: 700;
            color: #000F94;
          }

          .alert p {
            margin-left: 0;
            margin-right: 1.33333rem;
            margin-top: 1.33333rem;
            padding-bottom: 0.33333rem;
            padding-left: 0.66667rem;
            padding-right: 0.33333rem;
            padding-top: 0.33333rem;
            margin-bottom: 1.33333rem;
            background: #f9f9f9;
          }

          .alert.alert-success p {
            background: #ddf9dd;
          }

          .alert.alert-info p {
            background: #ddddf9;
          }

          .alert.alert-warning p {
            background: #f9f9dd;
          }

          .alert.alert-danger p {
            background: #f9dddd;
          }
          `
            }}
          />
          {this.props.headComponents}
        </head>
        <body className="landing-page" {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
