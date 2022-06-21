import React from "react";
import { Link } from "gatsby";

import { PrismCode } from "react-prism";

//Prism highlighting for docker commands
require("prismjs");
require("prismjs/components/prism-bash");

export default props => {
    if (props.docker) {
      return (
        <div>
          <h2>Docker image</h2>
          <p>
            The resulting Docker image is called{" "}
            <strong>{props.docker.imageName}</strong> and it is available at{" "}
            <a href={"https://hub.docker.com/r/" + props.docker.imageName}>
              {" "}
              DockerHub
            </a>
            . The image can be built using this{" "}
            <a href={props.docker.buildScript}>build script</a>.
          </p>
          <p>
            To run Docker container, run:
            <br />{" "}
            <pre>
              <PrismCode className="language-bash">
                {props.docker.runContainer}
              </PrismCode>
            </pre>
          </p>
          <p>
            To access Docker container:
            <br />{" "}
            <pre>
              <PrismCode className="language-bash">
                {props.docker.accessContainer}
              </PrismCode>
            </pre>
          </p>
          <p>
            For More information about how to use Docker see{" "}
            <Link to="/en/developers/docker-guide/#docker">docker info</Link>.
          </p>
        </div>
      );
    }
    return null;
  };
