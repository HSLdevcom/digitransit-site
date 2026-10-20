import React from "react";

// Only architecture images are bundled, not everything under pages
const architectureImages = require.context(
  "../pages",
  true,
  /architecture\.(svg|png)$/
);

const Image = ({ url }) => {
  if (typeof url === "undefined") {
    return null;
  }
  return <img src={url} alt="Architecture diagram" />;
};

const ArchitectureHeader = props => {
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
  const imageModule = architectureImages(`.${props.slug}${imageFile}`);
  const image = imageModule.default || imageModule;

  return (
    <div>
      <p>{props.description.info}</p>
      <Image url={props.description.img} />
      <h2>Service Architecture</h2>
      <img src={image} alt="Architecture diagram" />
    </div>
  );
};

export default ArchitectureHeader;
