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
  }
});
