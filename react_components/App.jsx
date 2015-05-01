var React = require('react');
var MessageList = require('./components/messagelist.jsx');
var MessageForm = require('./components/messageform.jsx');
var UsersList = require('./components/userslist.jsx');
var ChangeNameForm = require('./components/changenameform.jsx');
var socket = io();

console.log('TEST');
var App = React.createClass({
  Messages: [],
  Users: [],
  getInitialState: function () {
    socket.on('init', this.init);
    socket.on('send:message', this.message);
    socket.on('user:join', this.userJoin);
    socket.on('user:leave', this.userLeave);
    socket.on('change:name', this.changeName);
    return {
      messages: [],
      users: [],
      user: '',
      text: ''
    }
  },
  init: function (data) {
    console.log(data);
    this.Users = data.users;
    this.Messages = data.messages;
    this.setState({messages: this.Messages, users: this.Users, user: data.user});
  },
  message: function (data) {
    this.Messages.push(data);
    this.setState({messages: this.Messages});
  },
  userJoin: function (data) {
    this.Users.push(data.user);
    this.Messages.push({
      text: data.user + ' has joined',
      user: 'MESSAGE BOT'
    });
    this.setState({users: this.Users, messages: this.Messages});    
  },
  userLeave: function (data) {
    var index = this.Users.indexOf(data.user);
    this.Users.splice(index, 1);
    this.Messages.push({
      text: data.user + ' has left', 
      user: 'MESSAGE BOT'
    });
    this.setState({users: this.Users, messages: this.Messages});
  },
  changeName: function (data) {
    this.Users.splice(this.Users.indexOf(data.oldName), 1, data.newName);
    this.Messages.push({
      text: data.oldName + ' changed name to ' + data.newName, 
      user: 'MESSAGE BOT'
    });
    this.setState({users: this.Users});
  },
  messageSubmit: function (message) {
    this.Messages.push(message);
    this.setState({messages: this.Messages});
    socket.emit('send:message', message);
  },
  changeNameSubmit: function (newName) {
    var $this = this;
    var oldName = this.state.user;
    socket.emit('change:name', {name:newName}, function (done) {
      if (!done) {
        alert('This name has been taken');
      } else {
        $this.Users.splice($this.Users.indexOf(oldName), 1, newName);
        $this.setState({user:newName, users: $this.Users});
      }
    });
  },
  render: function () {
    return (
      <div>
        <ChangeNameForm fn={this.changeNameSubmit}/>
        <UsersList users={this.state.users}/>
        <MessageList messages={this.state.messages}/>
        <MessageForm user={this.state.user} messageSubmit={this.messageSubmit}/>
      </div>
    );
  },
});

React.render(<App />, document.body);