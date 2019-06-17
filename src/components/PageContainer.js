import styled from "styled-components";

import Container from "./Container";

import typography from "../utils/typography";

const { rhythm } = typography

export default styled(Container)`
    max-width: 1250px;
    width: 100%;
    padding: ${rhythm(1)} ${rhythm(1 / 2)};
`