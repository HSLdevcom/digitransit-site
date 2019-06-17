import React from "react";

export default props => {
    if (!props.replit) {
      return <span />;
    }
  
    const getEmbed = example => {
      if (
        example == null ||
        example.title == null ||
        example.height == null ||
        example.url == null
      ) {
        return null;
      }
  
      return (
        <div>
          <h3>{example.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: example.description }} />
          <iframe
            height={example.height}
            width="100%"
            src={example.url + "?lite=true"}
            frameBorder="no"
            allowtransparency="true"
            allowfullscreen="true"
            sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"
          />
        </div>
      );
    };
  
    let note = null;
    if (props.replit.note) {
      note = <div dangerouslySetInnerHTML={{ __html: props.replit.note }} />;
    }
  
    let title = "Test the API";
    if (props.replit.title) {
      title = props.replit.title;
    }
  
    const list = props.replit.embeds.map(getEmbed);
  
    return (
      <div>
        <h2>{title}</h2>
        {note}
        {list}
      </div>
    );
  };