var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {text: ''};  
  },
  submitHandle: function (e) {
    e.preventDefault();
    var message = {
      text: this.state.text,
      user: this.props.user
    }
    this.props.messageSubmit(message);
    this.setState({text: ''});
  },
  changeHandle: function (e) {
    this.setState({text: e.target.value});
  },
  keyUpHandle: function (e){
    if (e.keyCode === 13) {
      e.preventDefault();
      this.submitHandle(e);
    }
  },
  render: function () {
    return (
      <form ref="send" onSubmit={this.submitHandle}>
        <textarea onKeyUp={this.keyUpHandle} onChange={this.changeHandle} value={this.state.text}></textarea>
      </form>
    );
  }
});