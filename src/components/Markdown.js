import React from "react";

const Markdown = props => (
  <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
);

export default Markdown;
