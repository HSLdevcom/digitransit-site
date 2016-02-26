import React from 'react';
import { RouteHandler, Link } from 'react-router';


export default class extends React.Component {
  render() {
    return(
      <div>
        <div>{this.props.page.data.date}</div>
        <h1>{this.props.page.data.title}</h1>
        <RouteHandler {...this.props}/>
      </div>
    )
  }


}
