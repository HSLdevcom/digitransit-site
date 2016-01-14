import React from 'react';
import DocumentTitle from 'react-document-title';

module.exports = React.createClass({
  render: function() {
    var post, rhythm;
    rhythm = this.props.typography.rhythm;
    post = this.props.page.data;

    return (
      <DocumentTitle title={`${this.props.config.siteTitle}`}>
        <div className="markdown">
          <h2 style={{textAlign: "center"}}>{post.title}</h2>
          <div dangerouslySetInnerHTML={{__html: post.body}}/>
        </div>
      </DocumentTitle>
    );
  }
});
