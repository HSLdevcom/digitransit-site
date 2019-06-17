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
            font-size: 1.1em;
            text-decoration: none;
            padding: 0.5em;
          }

          .join-to-digitransit-content img {
            height: 400px;
            float: right;
          }

          .join-to-digitransit-content h3 {
            clear: right;
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


          @media
          (max-width: 600px) {
            .join-to-digitransit-content img {
              height: 200px;
              float: right;
            }
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
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
            var _paq = _paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="//piwik.digitransit.fi/";
              _paq.push(['setTrackerUrl', u+'piwik.php']);
              _paq.push(['setSiteId', 1]);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
            })();
          `
            }}
          />
          <noscript>
            <p>
              <img
                src="//piwik.digitransit.fi/piwik.php?idsite=1"
                style={{ border: 0 }}
                alt=""
              />
            </p>
          </noscript>
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
