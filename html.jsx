import React from 'react';
import DocumentTitle from 'react-document-title';

import typography from './utils/typography';
const { TypographyStyle, GoogleFont } = typography;

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      body: ""
    };
  },

  render: function() {
    var title, urlPrefix;
    title = DocumentTitle.rewind();
    if (this.props.title) {
      title = this.props.title;
    }
    if ((typeof __GH_PAGES__ !== "undefined" && __GH_PAGES__ !== null) && __GH_PAGES__) {
      urlPrefix = this.props.config.ghPagesURLPrefix;
    } else {
      urlPrefix = "";
    }


    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta property="og:url" content="http://digitransit.fi/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content="Digitransit" />
          <meta property="og:description" content="HSL:n Reittiopas.fi ja Liikenneviraston Matka.fi uudistuvat. Apuasi kaivataan kehitystyössä. Tule palvelun testaajaksi tai tee siitä saman tien parempi." />
          <meta property="og:image" content="http://digitransit.fi/header.mobile.jpg" />
          <meta property="og:locale" content="fi_FI" />
          <meta name='viewport' content='user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0'/>
          <title>{title}</title>
          <script src="https://cdn.polyfill.io/v2/polyfill.js?features=String.prototype.repeat"/>
          <link rel="shortcut icon" href={this.props.favicon}/>
          <style dangerouslySetInnerHTML={{__html: `
          #header-image {
            background-image: url("${urlPrefix}/header.jpg");
            background-position: center;
            background-size: 2048px;
            height: 720px;
          }

          #header-logo {
            position: absolute;
            left: 13%;
            top: 272px;
            width: 338px;
            height: 108px;
          }

          #header-text {
            position: absolute;
            color: #fff;
            font-weight: 300;
            -webkit-font-smoothing: antialiased;
            text-align: left;
            left: 13%;
            top: 415px;
            max-width: 430px;
          }

          @media
          (-webkit-min-device-pixel-ratio: 2),
          (min-resolution: 192dpi) {
            #header-image {
              background-image: url("${urlPrefix}/header.2x.jpg");
              background-size: 2048px;
            }
          }

          @media
          (max-width: 1024px) {
            #header-image {
              background-position: 60%;
            }

            #header-logo {
              left: 8%;
              top: 370px;
              width: 250px;
              height: 80px;
            }

            #header-text {
              left: 8%;
              top: 470px;
              max-width: 300px;
            }
          }

          @media
          (max-width: 600px) {
            #header-image {
              background-image: url("${urlPrefix}/header.mobile.jpg");
              background-size: 600px 750px;
              height: 750px;
            }

            #header-logo {
              left: 40px;
              top: 440px;
            }

            #header-text {
              left: 40px;
              top: 540px;
              max-width: 250px;
              font-size: 1.6rem;
              line-height: 1.25;
            }
          }
          `}}/>
          <GoogleFont/>
          <TypographyStyle/>
        </head>
        <body className="landing-page">
          <div id="react-mount" dangerouslySetInnerHTML={{__html: this.props.body}} />
          <script src={`${urlPrefix}/bundle.js`}/>
          <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
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
          `}}/>
          <noscript>
            <p>
              <img src="//piwik.digitransit.fi/piwik.php?idsite=1" style={{border: 0}} alt="" />
            </p>
          </noscript>
        </body>
      </html>
    );
  }
});
