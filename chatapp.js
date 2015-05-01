var userNames = (function (){
  var names = {};
  // Checks if username exists then sets it
  var setName = function (name) {
    if (!name || names[name]) return false;
    names[name] = true;
    return true;
  };
  // Deletes username from names object
  var unsetName = function (name) {
    if (names[name]) delete names[name];
  };
  // Sets an initial guest name
  var guestName = function () {
    var num = 1;
    do {
      var name = 'UndefinedUser' + num
      num++;
    } while (!setName(name));
    return name;
  };
  // Pushes all usernames to array and returns
  var getNames = function () {
    var all = [];
    for (n in names) {
      all.push(n);
    }
    return all;
  }
  // Returns all public methods
  return {
    setName: setName,
    unsetName: unsetName,
    guestName: guestName,
    getNames: getNames
  }
}());
var messageStore = (function () {
  // Message store array
  var messages = [];
  // Adds message to message store, if messages > 50 removes the first message
  var addMessage = function (message) {
    if (messages.length >= 50) messages.shift();
    messages.push(message);
  }
  // Returns all messages
  var getMessages = function () {
    return messages;
  }
  // Returns public methods
  return {
    addMessage: addMessage,
    getMessages: getMessages
  };
}());

module.exports = function (socket) {
  var name = userNames.guestName();
  console.log('Connected:', socket.id, name);
  socket.emit('init', {
    users: userNames.getNames(),
    messages: messageStore.getMessages(),
    user: name,
  });
  socket.broadcast.emit('user:join', {user: name});
  socket.on('send:message', function (message) {
    messageStore.addMessage(message);
    console.log(socket.id, 'Sent message:', message.text);
    socket.broadcast.emit('send:message', {
      text: message.text,
      user: name
    });
  });
  socket.on('change:name', function (data, cb) {
    if (userNames.setName(data.name)) {
      var oldName = name;
      userNames.unsetName(oldName);
      name = data.name;
      console.log(socket.id, 'changed name:', oldName,'>', name);
      socket.broadcast.emit('change:name', {
        oldName: oldName,
        newName: name
      });
      cb(true);
    } else {
      cb(false);
    }
  });
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:leave', {user:name});
    userNames.unsetName(name);
  });
};