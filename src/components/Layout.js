import React from "react";
import styled from "styled-components";
import { StaticQuery, Link, graphql } from "gatsby";

import logo from "../pages/logo.png";

import typography from "../utils/typography";

const { rhythm } = typography;

const MobileMenu = styled.div`
  background-color: ${props => props.headerColor};
  line-height: ${rhythm(2)};
  font-size: ${rhythm(0.75)};
  text-align: center;
`

const MobileMenuButton = styled.svg`
  height: 2em;
  fill: #fff;
  margin-right: ${rhythm(0.5)};
  margin-top: -0.25em;
  cursor: pointer;

  @media (min-width: 1180px) {
    display: none;
  }
`

const LangLinkSpan = styled.span`
  margin: ${rhythm(0.5)}
`

const NavLogo = styled(Link)`
  margin-left: 24px;
  margin-top: 7px;
  @media (min-width: 1180px) {
    margin-left: 190px;
  }
`

const NavLinks = styled.span`
  display: none;

  @media (min-width: 1180px) {
    text-transform: uppercase;
    text-align: right;
    padding: ${rhythm(3 / 4)} ${rhythm(1 / 2)};
    margin: 0 auto;
    display: block;
    margin-right: 180px;
  }
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

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 3;
`

const MessageBar = styled.div`
  width: 100%;
  text-align: center;
  background-color: #ddd;
  color: #000;
`

const Navigation = styled.nav`
  font-size: 16px;
  line-height: 18.75px;
  text-transform: uppercase;
  width: 100%;
  margin: 0 auto;
  font-weight: 400;
  background-color: ${props => props.headerColor};
  display: flex;
  flex-direction: column;
`

const NavigationBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin: 32px 0;
  filter: brightness(2);
  WebkitFilter: brightness(2);
  width: 240px;
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
                maintainers
              }
              en {
                users
                developers
                municipalities
                maintainers
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
            onClick={() => this.setState({ mobileMenuOpen: false })}
            to="/"
            hrefLang="fi"
          >
            FI
          </NavLink>
        </LangLinkSpan>
        <LangLinkSpan>
          <NavLink
            onClick={() => this.setState({ mobileMenuOpen: false })}
            to="/en/"
            hrefLang="en"
          >
            EN
          </NavLink>
        </LangLinkSpan>
        <br />
        <NavLink
          onClick={() => this.setState({ mobileMenuOpen: false })}
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
          onClick={() => this.setState({ mobileMenuOpen: false })}
          to={`${localePrefix}#municipalities`}
        >
          {i18n.municipalities}
        </NavLink>
        <br />
        <NavLink
          onClick={() => this.setState({ mobileMenuOpen: false })}
          to={`${localePrefix}#maintainers`}
        >
          {i18n.maintainers}
        </NavLink>
        <br />
      </MobileMenu>
    );

    return (
      <LayoutContainer ref="mainflex">
        <Header>
          <MessageBar>
          Digitransit APIs require registration. <a href="/en/developers/api-registration">More information</a>
          </MessageBar>
          <Navigation headerColor={this.props.data.site.siteMetadata.headerColor}>
            <NavigationBar>
              <NavLogo
                onClick={() => this.setState({ mobileMenuOpen: false })}
                to={`/`}
              >
                <img src={logo} style={{ height: "48px", margin: "0px" }} />
              </NavLogo>
              <NavLinks>
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
                <NavLink
                  to={`${localePrefix}#maintainers`}
                >
                  {i18n.maintainers}
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
              </NavLinks>
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
            </NavigationBar>
            {this.state.mobileMenuOpen && mobileMenu}
          </Navigation>
        </Header>

        {this.props.children}

        <Footer>
          <FooterLogos>
            <FooterLogo src={logo} />
          </FooterLogos>
          <div style={{ padding: "1em", color: "white", fontSize: 14, textAlign: "center" }}>
            digitransit@hsl.fi
            <br />
            © Digitransit {1900 + new Date().getYear()}
          </div>
        </Footer>
      </LayoutContainer>
    );
  }
}
