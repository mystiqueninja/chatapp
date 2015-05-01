var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="message">
        <b>{this.props.user}</b>: {this.props.text}
      </div>
    );
  }
});