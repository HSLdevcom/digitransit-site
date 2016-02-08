import React from 'react';
import { RouteHandler, Link } from 'react-router';


export default class extends React.Component {
  render() {
    return(
      <div>
        <div>{this.props.page.data.date}</div>
        <RouteHandler {...this.props}/>
      </div>
    )
  }


}
