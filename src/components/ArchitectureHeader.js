import React from "react";

const Image = ({ url }) => {
  if (typeof url === "undefined") {
    return null;
  }
  return <img src={url} />;
};

export default props => {
  if (!props.description) {
    return null;
  }

  let imageFile = "architecture.svg";

  // IE doesn't fully support SVG:s made with draw.io
  if (
    typeof window !== 'undefined' && (window.navigator.userAgent.indexOf("MSIE") !== -1 || window.navigator.appVersion.indexOf("Trident/") > 0)
  ) {
    imageFile = "architecture.png";
  }

  // We'll have to use full path as image location. By just using "./architecture.svg", browser won't update image
  // when moving from page to page if image name is the same
  const image = require("../pages" + props.slug + imageFile);

  return (
    <div>
      <p>{props.description.info}</p>
      <Image url={props.description.img} />
      <span style={{ float: "right", "font-size": "0.8em;" }}>
        <a href={"https://www.draw.io/?url=" + props.description.architecture}>
          edit architecture image
        </a>
      </span>
      <h2>Service Architecture</h2>
      <img src={image} />
    </div>
  );
};