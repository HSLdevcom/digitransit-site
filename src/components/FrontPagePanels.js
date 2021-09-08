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
    width: 252px;
    max-height: 252px;
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
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background: ${props => props.background};
    min-height: 500px;
    padding-top: 1.5em;
    padding-bottom: 1.5em;

    @media (max-width: 1020px) {
        flex-direction: column;
    }
`

const FrontPagePanelBody = styled.div`
    max-width: 465px;
    margin-left: ${props => props.swapped ? '60px' : '30px'};
    margin-right: ${props => props.swapped ? '30px' : '60px'};
    margin-top: 1em;
    margin-bottom: 1em;

    @media (max-width: 1020px) {
        margin-left: ${rhythm(1)};
        margin-right: ${rhythm(1)};
    }
`

const FrontPagePanelTitle = styled.h2`
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
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#000F94"
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
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#000F94"
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