// The Head API cannot set attributes of the html element
exports.onRenderBody = ({ pathname, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: pathname.startsWith("/en/") ? "en" : "fi" });
};
