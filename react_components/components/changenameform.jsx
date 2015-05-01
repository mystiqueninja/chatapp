var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {text: ''};
  },
  changeHandle:function (e) {
    e.preventDefault();
    this.setState({text: e.target.value});
  },
  submitHandle: function (e) {
    e.preventDefault();
    this.props.fn(this.state.text);
    this.setState({text: ''});
  },
  render: function () {
    return (
    <form onSubmit={this.submitHandle} >
      <input onChange={this.changeHandle} value={this.state.text}/>
    </form>
    );
  }
});