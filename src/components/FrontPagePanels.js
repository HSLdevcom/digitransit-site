import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import typography from "../utils/typography";

const { rhythm } = typography

export default ({ panels }) => (
    <div>
        {panels.map(panel => <FrontPagePanel {...panel} />)}
    </div>
)

const FrontPagePanelImage = styled.img`
    max-width: 80vw;
    width: 360px;
    max-height: 360px;
    margin-left: 45px;
    margin-right: 45px;
    margin-top: 1em;
    margin-bottom: 1em;
    order: ${props => props.swapped ? -1 : 2};

    @media (max-width: 1020px) {
        order: -1;
    }
`

const FrontPagePanelContainer = styled.div`
    position: relative;
    display: flex;
    flexWrap: wrap;
    justify-content: center;
    align-items: center;
    color: ${props => props.textColor || '#fff'};
    background: ${props => props.background};
    font-weight: 300;
    min-height: 500;
    padding-top: 1.5em;
    padding-bottom: 1.5em;

    @media (max-width: 1020px) {
        flex-direction: column;
    }
`

const FrontPagePanelBody = styled.div`
    max-width: 465px;
    margin-left: ${props => props.swapped ? 60 : 30};
    margin-right: ${props => props.swapped ? 30 : 60};
    margin-top: 1em;
    margin-bottom: 1em;

    @media (max-width: 1020px) {
        margin-left: ${rhythm(1)};
        margin-right: ${rhythm(1)}
    }
`

const FrontPagePanelTitle = styled.h2`
    color: ${props => props.textColor || '#fff'};

    @media (max-width: 1020px) {
        text-align: center;
    }
`

const FrontPagePanel = ({ id, textColor, title, body, background, links, image, swapped }) => {
    const frontPanelLinks = links.map(link => {
        if (link.url.substring(0, 4) === "http") {
          return (
            <div>
              <a
                href={link.url}
                style={{
                  textDecoration: "none",
                  marginTop: rhythm(0.5),
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#fff"
                }}
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
                style={{
                  textDecoration: "none",
                  marginTop: rhythm(0.5),
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#fff"
                }}
              >
                {link.title}&nbsp;»
              </Link>
            </div>
          );
        }
      });
  
      return (
          <FrontPagePanelContainer id={id} background={background} textColor={textColor}>
              <FrontPagePanelImage src={image.publicURL} swapped={swapped} />
              <FrontPagePanelBody swapped={swapped}>
                <FrontPagePanelTitle textColor={textColor}>
                  {title}
                </FrontPagePanelTitle>
                <div style={{ paddingBottom: "1em" }}>{body}</div>
                <div>{frontPanelLinks}</div>
              </FrontPagePanelBody>
          </FrontPagePanelContainer>
    );
}