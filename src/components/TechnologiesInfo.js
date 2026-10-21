import React from "react";

const TechnologiesInfo = props => {
    if (props.technologies) {
      const getUrl = tech => {
        if (tech.url != null) {
          return (
            <span>
              (<a href={tech.url}>{tech.url}</a>)
            </span>
          );
        }
        return null;
      };
  
      const list = props.technologies.map(tech => {
        return (
          <li>
            {tech.title} {getUrl(tech)}
          </li>
        );
      });
      return (
        <div>
          <h2>Key technologies and specifications</h2>
          <ul>{list}</ul>
        </div>
      );
    }
    return null;
  };
  

export default TechnologiesInfo;
