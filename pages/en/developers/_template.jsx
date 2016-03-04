import React from 'react';
import { RouteHandler, Link, State, Navigation } from 'react-router';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import Typography from 'typography';
import sortBy from 'lodash/collection/sortBy';
import { templateChildrenPages } from 'gatsby-helpers';
import { DockerInfo, TechnologiesInfo, Assets, ArchitectureHeader } from './_components';

var typography = new Typography();
var rhythm = typography.rhythm, fontSizeToMS = typography.fontSizeToMS;

module.exports = React.createClass({
  mixins: [State, Navigation],

  handleTopicChange: function(e) {
    return this.transitionTo(e.target.value);
  },

  render: function() {
    var childPages, docOptions, docPages;
    rhythm = this.props.typography.rhythm;
    childPages = templateChildrenPages(__filename, this.props.state).map(function(child) {
      return {
        title: child.data.title,
        level: child.path.split('/').length-3,
        path: child.path,
        order: child.data.order
      };
    });
    childPages = sortBy(childPages, function(child) {
      return child.path
    });
    docOptions = childPages.map(function(child) {
      return React.createElement("option", {
        "key": child.path,
        "value": child.path
      }, '-'.repeat(child.level) + " " + child.title);
    });
    docPages = childPages.map((function(_this) {
      return function(child) {
        var isActive;
        isActive = _this.isActive(child.path);
        return (
          <li
            key={child.path}
            style={{
              marginBottom: rhythm(1/2),
              marginLeft: rhythm(child.level)
            }}
          >
            <Link
              to={child.path}
              style={{
                textDecoration: 'none'
              }}
            >
              {isActive ? <strong>{child.title}</strong> : child.title }
            </Link>
          </li>
        )
      };
    })(this));

    return (
      <div>
        <Breakpoint minWidth={700}>
          <div>
            <div
              style={{
                overflowY: 'auto',
                paddingRight: `calc(${rhythm(1/2)} - 1px)`,
                position: 'absolute',
                width: `calc(${rhythm(10)} - 1px)`,
                borderRight: '1px solid lightgrey'
              }}
            >
              <ul
                style={{
                  listStyle: 'none',
                  marginLeft: 0,
                  marginTop: rhythm(1/2)
                }}
              >
                {docPages}
              </ul>
            </div>
            <div
              style={{
                padding: `0 ${rhythm(1)}`,
                paddingLeft: `calc(${rhythm(10)} + ${rhythm(1)})`,
                minHeight: '1000px'
              }}
            >
              <h1>{this.props.page.data.title}</h1>
              <h4 style={{'color': 'red'}}>Please notice that API urls are about to change during March 2016.</h4>
              <ArchitectureHeader {...this.props.page.data}/>
              <RouteHandler typography={typography} {...this.props}/>
              <Assets {...this.props.page.data}/>
              <TechnologiesInfo {...this.props.page.data}/>
              <DockerInfo {...this.props.page.data}/>
            </div>
          </div>
        </Breakpoint>
        <Breakpoint maxWidth={700}>
          <strong>Topics:</strong>
          {' '}
          <select
            defaultValue={this.props.state.path}
            onChange={this.handleTopicChange}
          >
            {docOptions}
          </select>
          <br />
          <br />
          <RouteHandler typography={typography} {...this.props}/>
        </Breakpoint>
      </div>
    );
  }
});
