angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $ionicModal, $state, Users) {
  var self = this;

  // Routing
  $scope.showSignup = function() {
    $state.go('signup');
  }

  $scope.showLogin = function() {
    $state.go('login');
  }

  // Authentication
  $scope.signIn = function(user) {
    var username = user.email;
    var password = user.password;
    console.log("Username: " + username);
    console.log("Password: " + password);

    if (username && username.length > 0 && password && password.length > 0) {

      // Check if this user is valid
      var storedUser = Users.get(username);
      if (storedUser == null) {
        alert("This user does not exist. Try creating an account first.");
        return;
      }

      // Check if passwords match
      if (storedUser.password != password) {
        alert("The password you entered did not match our records.");
      } else {
        console.log(username + " signed in successfully!");
        $state.go("tab.orders");
      }
    } else {
      alert("Username and password were not valid strings.");
    }
  }

  $scope.createAccount = function(user) {
    // Print input
    var username = user.email;
    var password = user.password;
    console.log("Username: " + username);
    console.log("Password: " + password);

    // Get existing users
    var storedUsers = Users.all();

    if (username && username.length > 0 && password && password.length > 0) {

      // Check if user already exists
      if (Users.get(username) != null) {
        alert("This username already exists! Try a different one.");
      } else {
        // Otherwise, create a new user
        Users.create({
          "username": username,
          "password": password
        })
      }

      $state.go("tab.orders");
    } else {
      console.error("Username and password were not valid strings.");
    }
  }
})

.controller('DashCtrl', function($scope) {})

// Orders controller
.controller('OrdersCtrl', function($scope, $ionicModal, $state, Orders) {
  $scope.orders = Orders.all();

  $scope.viewOrder = function(orderId) {
    $state.go('order-detail', {
      orderId: orderId
    });
  }

  // Create Order Modal
  $ionicModal.fromTemplateUrl('templates/create-order.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createNewOrder = function() {
    $scope.modal.show();
  }

  $scope.cancelNewOrder = function() {
    $scope.modal.hide();
  }

  $scope.submitOrder = function(product) {
    var productName = product.name;
    var quantity = product.quantity;
    var price = product.price;
    var category = product.category;
    var date = Date.now();

    Orders.create({
      id: guid(),
      name: productName,
      quantity: quantity,
      price: price,
      category: category,
      orderedAt: date
    });

    $scope.modal.hide();
  }

  $scope.remove = function(order) {
    Orders.remove(order);
  }
})

.controller('OrderDetailCtrl', function($scope, $ionicHistory, $state, Orders) {
  orderId = $state.params.orderId;
  $scope.order = Orders.get(orderId);

  console.log("Located order " + orderId);

  $scope.goBack = function() {
    console.log($ionicHistory.viewHistory());
    $ionicHistory.goBack();
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
