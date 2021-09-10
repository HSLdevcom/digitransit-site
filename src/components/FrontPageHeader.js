import React from "react"
import styled from "styled-components"

import digitransitImage from "../pages/digitransit-image.png"
import digitransitImage2x from "../pages/digitransit-image-2x.png"
import digitransitImageMobile from "../pages/digitransit-image-mobile.png"
import hslLogo from "../pages/hsl.svg"
import traficomLogo from "../pages/traficom.svg"
import lmjLogo from "../pages/lmj.svg"

const HeaderImage = styled.img`
    position: relative;
    z-index: 2;
    width: 100%;
    display: block;
    margin: 55px 0 0 0;

    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        display: none;
    }
    @media (max-width: 600px) {
        display: none;
    }
`

const HeaderImage2x = styled.img`
    position: relative;
    z-index: 2;
    width: 100%;
    display: none;
    margin: 55px 0 0 0;

    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        display: block;
    }
    @media (max-width: 600px) {
        display: none;
    }
`

const HeaderImageMobile = styled.img`
    position: relative;
    z-index: 2;
    width: 100%;
    display: none;
    margin: 55px 0 0 0;

    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        display: none;
    }
    @media (max-width: 600px) {
        display: block;
    }
`

const Logos = styled.div`
    position: relative;
    background: #eef1f3;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    & > img {
        margin: 2em 2em;
    }
`

export default () => (
    <div>
    <HeaderImage src={digitransitImage} />
    <HeaderImage2x src={digitransitImage2x}  />
    <HeaderImageMobile src={digitransitImageMobile}  />
    <Logos>
        <img src={hslLogo} />
        <img src={traficomLogo} />
        <img src={lmjLogo} />
    </Logos>
    </div>
);