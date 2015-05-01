var React = require('react');
var Message = require('./message.jsx');

module.exports = React.createClass({
  render: function () {
    var Messages = this.props.messages.map(function (message) {
      return <Message user={message.user} text={message.text} />
    });
    return (
      <div>{Messages}</div>
    );
  }
});