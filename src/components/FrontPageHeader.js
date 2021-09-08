import React from "react"
import styled from "styled-components"

import digitransitImage from "../pages/digitransit-image.png"
import digitransitImage2x from "../pages/digitransit-image-2x.png"
import hslLogo from "../pages/hsl.svg"
import traficomLogo from "../pages/traficom.svg"
import lmjLogo from "../pages/lmj.svg"

import header from "../pages/header.jpg";
import header2x from "../pages/header.2x.jpg";
import headerMobile from "../pages/header.mobile.jpg";

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
        background-image: url(${digitransitImage});
        background-size: 600px 750px;
        height: 750px;
    }
`

const HeaderLogo = styled.img`
    position: absolute;
    left: 13%;
    top: 272px;
    width: 338px;
    height: 108px;

    @media (max-width: 1024px) {
        left: 8%;
        top: 370px;
        width: 250px;
        height: 80px;
    }

    @media (max-width: 600px) {
        left: 40px;
        top: 440px;
    }
`

const HeaderText = styled.h1`
    position: absolute;
    color: #fff;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    left: 13%;
    top: 415px;
    max-width: 430px;

    @media (max-width: 1024px) {
        left: 8%;
        top: 470px;
        max-width: 300px;
    }

    @media (max-width: 600px) {
        left: 40px;
        top: 540px;
        max-width: 250px;
        font-size: 1.6rem;
        line-height: 1.25;
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