var React = require('react');

module.exports = React.createClass({

  render: function () {
    var Users = this.props.users.map(function (user) {
      return <li>{user}</li>  
    }); 
    return <ul>{Users}</ul>;
  }
});