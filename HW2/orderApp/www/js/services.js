angular.module('starter.services', [])

.factory('Orders', function() {
  // Put dummy orders here
  var orders = [];

  var storedOrders = JSON.parse(localStorage.getItem("orders"));
  if (storedOrders && storedOrders.length > 0) {
    orders = storedOrders;
    console.log(storedOrders.length + " orders found in storage.")
  }

  function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders))
  }

  return {
    all: function() {
      if (orders.length > 0) {
        return orders;
      }
      return [];
    },
    create: function(order) {
      orders.push(order);
      saveOrders();
    },
    remove: function(order) {
      orders.splice(orders.indexOf(order), 1);
      saveOrders();
    },
    get: function(orderId) {
      for (var i = 0; i < orders.length; i++) {
        if (orders[i].id === orderId) {
          return orders[i];
        }
      }
      return null;
    }
  };
})

.factory('Users', function() {
  // Put dummy users here
  var users = [];

  var storedUsers = JSON.parse(localStorage.getItem("users"));
  if (storedUsers && storedUsers.length > 0) {
    users = storedUsers;
    console.log(storedUsers.length + " users found in storage.")
  }

  function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users))
  }

  return {
    all: function() {
      if (users.length > 0) {
        return users;
      }
      return [];
    },
    create: function(user) {
      console.log("New user (" + user.username + ") created!");
      users.push(user);
      saveUsers();
    },
    remove: function(user) {
      users.splice(users.indexOf(user), 1);
      saveUsers();
    },
    get: function(username) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          return users[i];
        }
      }
      return null;
    }
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
