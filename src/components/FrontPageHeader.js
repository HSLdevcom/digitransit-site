import React from "react"
import styled from "styled-components"

import digitransitImage from "../pages/digitransit-image.png"
import digitransitImage2x from "../pages/digitransit-image-2x.png"
import digitransitImageMobile from "../pages/digitransit-image-mobile.png"
import hslLogo from "../pages/hsl.svg"
import traficomLogo from "../pages/traficom.svg"
import lmjLogo from "../pages/lmj.svg"

const HeaderImage = styled.div`
    position: relative;
    margin: 0 auto;
    z-index: 2;
    background-image: url(${digitransitImage});
    background-position: center;
    background-size: 2048px;
    height: 720px;

    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        background-image: url(${digitransitImage2x});
        background-size: 2048px;
    }

    @media (max-width: 1024px) {
        background-position: 60%;
    }

    @media (max-width: 600px) {
        background-image: url(${digitransitImageMobile});
        background-size: 600px 750px;
        height: 750px;
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
    <HeaderImage />
    <Logos>
        <img src={hslLogo} />
        <img src={traficomLogo} />
        <img src={lmjLogo} />
    </Logos>
    </div>
);