import React from "react";
import styled from "styled-components";
import { StaticQuery, Link, graphql } from "gatsby";

import logo from "../pages/logo.png";
import hslLogo from "../pages/hsl-logo.png";

import typography from "../utils/typography";

const { rhythm } = typography;

const MobileMenu = styled.div`
  position: fixed;
  background-color: ${props => props.headerColor};
  width: 100vw;
  top: 59px;
  line-height: ${rhythm(2)};
  font-size: ${rhythm(0.75)};
  left: 0px;
  text-align: center;
`

const MobileMenuButton = styled.svg`
  height: 2em;
  fill: #fff;
  margin-right: ${rhythm(0.5)};
  margin-top: -0.25em;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`

const DesktopMenu = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`

const LangLinkSpan = styled.span`
  margin: ${rhythm(0.5)}
`

const NavLink = styled(Link)`
  margin: ${rhythm(0.5)};
  color: #fff;
  text-decoration: none;
`

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Navigation = styled.nav`
  font-size: 15px;
  text-transform: uppercase;
  position: fixed;
  max-width: 720px;
  z-index: 3;
  text-align: right;
  padding: ${rhythm(3 / 4)} ${rhythm(1 / 2)};
  margin: 0 auto;
  left: 152px;
  right: 0px;
  color: #fff;
  font-weight: 500;
  width: calc(100% - 152px);
`

const Footer = styled.footer`
  width: 100%;
  background: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const FooterLogos = styled.div`
  width: 950px;
  max-width: 80vw;
  margin: 0 auto;
  border-bottom: solid 1px #5c5c5c;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const FooterLogo = styled.img`
  margin: 2em 2em;
  filter: brightness(2);
  WebkitFilter: brightness(2);
`

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteTitle
            headerColor
            i18n {
              fi {
                users
                developers
                municipalities
              }
              en {
                users
                developers
                municipalities
              }
            }
          }
        }
      }
    `}
    render={data => <Layout {...props} data={data} />}
  />
);

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mobileMenuOpen: false };
  }

  render() {
    const potentialLocale = this.props.slug.substring(0, 4); //top level directory specifies language
    let locale = "fi";
    if (potentialLocale === "/en/") {
      locale = "en";
    } else if (potentialLocale === "/dev") {
      locale = "en";
    }
    const localePrefix = locale === "fi" ? "/" : "/en/";
    const i18n = this.props.data.site.siteMetadata.i18n[locale];

    const mobileMenu = (
      <MobileMenu headerColor={this.props.data.site.siteMetadata.headerColor}>
        <LangLinkSpan>
          <NavLink
            to="/"
            hrefLang="fi"
          >
            FI
          </NavLink>
        </LangLinkSpan>
        <LangLinkSpan>
          <NavLink
            to="/en/"
            hrefLang="en"
          >
            EN
          </NavLink>
        </LangLinkSpan>
        <br />
        <NavLink
          to={`${localePrefix}#users`}
        >
          {i18n.users}
        </NavLink>
        <br />
        <NavLink
          onClick={() => this.setState({ mobileMenuOpen: false })}
          to="/en/developers/"
        >
          {i18n.developers}
        </NavLink>
        <br />
        <NavLink
          to={`${localePrefix}#municipalities`}
        >
          {i18n.municipalities}
        </NavLink>
        <br />
      </MobileMenu>
    );

    return (
      <LayoutContainer ref="mainflex">
        <Navigation>
          <DesktopMenu>
            <NavLink
              to={`${localePrefix}#users`}
            >
              {i18n.users}
            </NavLink>
            <NavLink
              to={`/en/developers/`}
            >
              {i18n.developers}
            </NavLink>
            <NavLink
              to={`${localePrefix}#municipalities`}
            >
              {i18n.municipalities}
            </NavLink>
            <LangLinkSpan>|</LangLinkSpan>
            <LangLinkSpan>
              <NavLink
                to="/"
                hrefLang="fi"
              >
                FI
              </NavLink>
            </LangLinkSpan>
            <LangLinkSpan>
              <NavLink
                to="/en/"
                hrefLang="en"
              >
                EN
              </NavLink>
            </LangLinkSpan>
          </DesktopMenu>
          <MobileMenuButton
              id="icon-icon_menu"
              viewBox="0 0 1024 1024"
              style={{
                height: "2em",
                fill: "#fff",
                marginRight: rhythm(0.5),
                marginTop: "-0.25em",
                cursor: "pointer"
              }}
              onClick={() =>
                this.setState(state => {
                  return { mobileMenuOpen: !state.mobileMenuOpen }
                })
              }
            >
              <title>icon_menu</title>
              <path
                class="path1"
                d="M51.193 204.793h921.614c28.279 0 51.2 22.925 51.2 51.204 0 28.275-22.921 51.2-51.2 51.2h-921.614c-28.279 0-51.2-22.925-51.2-51.2 0-28.279 22.921-51.204 51.2-51.204z"
              />
              <path
                class="path2"
                d="M51.193 460.796h921.614c28.279 0 51.2 22.925 51.2 51.204 0 28.275-22.921 51.2-51.2 51.2h-921.614c-28.279 0-51.2-22.925-51.2-51.2 0-28.279 22.921-51.204 51.2-51.204z"
              />
              <path
                class="path3"
                d="M51.193 716.804h921.614c28.279 0 51.2 22.925 51.2 51.2 0 28.279-22.921 51.204-51.2 51.204h-921.614c-28.279 0-51.2-22.925-51.2-51.204 0-28.275 22.921-51.2 51.2-51.2z"
              />
          </MobileMenuButton>
          {this.state.mobileMenuOpen && mobileMenu}
        </Navigation>
        <div
          style={{
            position: "fixed",
            width: "100%",
            zIndex: 1,
            height: `calc(${rhythm(1.5)} + 23px)`,
            backgroundColor: this.props.data.site.siteMetadata.headerColor
          }}
        >
          <div style={{ maxWidth: 950, height: "100%", margin: "0 auto" }}>
            <Link to={`/`}>
              <img
                src={logo}
                style={{
                  height: "100%",
                  padding: 7,
                  margin: 0,
                  paddingLeft: rhythm(1)
                }}
              />
            </Link>
          </div>
        </div>

        {this.props.children}

        <Footer>
          <FooterLogos>
            <FooterLogo src={hslLogo} />
          </FooterLogos>
          <div style={{ padding: "1em", color: "white", fontSize: 14 }}>
            © Digitransit {1900 + new Date().getYear()}
          </div>
        </Footer>
      </LayoutContainer>
    );
  }
}
