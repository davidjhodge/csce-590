// var Parse = require('parse');

angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $ionicModal, $state, OpenFB) {
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

      Parse.User.logIn(username, password, {
        success: function(user) {
          // Login Success!
          console.log(user.id);

          $state.go("tab.orders");
        },
        error:function(user,error) {
          alert("Login Error: " + error.message);
        }
      });
    }
  }

  $scope.createAccount = function(user) {
    // Print input
    var username = user.email;
    var password = user.password;
    console.log("Username: " + username);
    console.log("Password: " + password);

    if (username && username.length > 0 && password && password.length > 0) {

      var user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", username);

      user.signUp(null, {
        success: function(user) {
          // Successfully created user
          console.log(user.id);

          $state.go("tab.orders");
        },
        error: function(error) {
          console.log(error.message);
          alert("Sign Up Error: " + error.message);
        }
      });
    }
  }

  // $scope.facebookSignIn = function() {
  //   Parse.FacebookUtils.logIn(null, {
  //     success: function(user) {
  //       if (!user.existed()) {
  //         alert("User signed up and logged in through Facebook!");
  //       } else {
  //         alert("User logged in through Facebook!");
  //       }
  //     },
  //     error: function(user, error) {
  //       alert("User cancelled the Facebook login or did not fully authorize.");
  //     }
  //   });
  // }
//
  $scope.facebookSignIn = function() {

    OpenFB.login('public_profile,email').then(
      function(result) {
        console.log("Access Token Retreived from Facebook!");

        // Create User with fbToken
        var fbToken = window.sessionStorage.fbtoken;

        // TODO Create a user with authData field as fbToken
        var user = new Parse.User();
        user.set("username", guid());
        user.set("password", guid());
        user.set("fbToken", fbToken);

        user.signUp(null, {
          success: function(user) {
            // Successfully created user
            console.log(user.id);

            $state.go("tab.orders");
          },
          error: function(user, error) {
            console.log(error);
            alert("Sign Up Error: " + error.message);
          },
        });
      });
    }
})

.controller('DashCtrl', function($scope) {})

// Orders controller
.controller('OrdersCtrl', function($scope, $ionicModal, $state) {
  $scope.getOrders = function() {
    var Order = Parse.Object.extend("Order");
    var query = new Parse.Query(Order);
    query.find({
      success: function(orders) {
        console.log("Successfully retrieved " + orders.length + " orders.");
        // console.log(JSON.stringify(orders));

        $scope.orders = [];
        for (var i = orders.length - 1; i >= 0; i--) {

          $scope.orders.push({
            id: orders[i].id,
            productQuantity: orders[i].get("productQuantity"),
            productName: orders[i].get("productName"),
            productPrice: orders[i].get("productPrice"),
            productCategory: orders[i].get("productCategory"),
            orderDate: orders[i].get("orderDate").toString(),
            productImage: orders[i].get("productImage")
          });
        }

        $scope.$apply();
      }
    });
  }
  // Initially get the orders when controller loads
  $scope.getOrders();

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
    var date = product.orderDate;

    var imageInput = document.getElementById("add-picture");
    if (imageInput.files.length === 0) {
      console.log("Image is empty.");
      return;
    }
    var imageFile = imageInput.files[0];
    var imageName = "orderImage.jpg";
    var parseFile = new Parse.File(imageName, imageFile);

    // Save Image file first
    parseFile.save().then(() => {
      // The file has been saved to Parse.

      // Create new Order object
      var Order = Parse.Object.extend("Order");
      var m = new Order();

      // User who placed the order
      m.set("orderedBy", Parse.User.current());
      m.set("productName", productName);
      m.set("productQuantity", quantity);
      m.set("productPrice", price);
      m.set("productCategory", category);
      m.set("orderDate", date);
      // Order date is the createdAt field
      // objectId is created by default
      m.set("productImage", parseFile);

      m.save().then((o) => {
        // Refresh Orders
        $scope.getOrders();

        $scope.modal.hide();
      });

    }, (error) => {
      // The file either could not be read, or could not be saved to Parse.
      console.log(error);
    });
  }

  $scope.remove = function(order) {
    var Order = Parse.Object.extend("Order");
    var query = new Parse.Query(Order);
    query.get(order.id, {
      success: function(storedOrder) {
        // The object was retrieved successfully.
        storedOrder.destroy({});
        $scope.getOrders();
        $scope.$apply();
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
        alert("Remove Error: " + error.message);
      }
    });
  }
})

.controller('OrderDetailCtrl', function($scope, $ionicHistory, $state) {
  const orderId = $state.params.orderId;

  var Order = Parse.Object.extend("Order");
  var query = new Parse.Query(Order);
  query.get(orderId, {
    success: function(storedOrder) {
      // The object was retrieved successfully.

      $scope.order = {
        id: storedOrder.id,
        productQuantity: storedOrder.get("productQuantity"),
        productName: storedOrder.get("productName"),
        productPrice: storedOrder.get("productPrice"),
        productCategory: storedOrder.get("productCategory"),
        orderDate: storedOrder.get("orderDate").toString(),
        productImage: storedOrder.get("productImage")
      };
      $scope.$apply();
      console.log("Located order " + storedOrder.id) + ".";
    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and description.
      alert("Get Order Error: " + error.message);
    }
  });

  $scope.goBack = function() {
    console.log($ionicHistory.viewHistory());
    $ionicHistory.goBack();
  }
})

.controller('AccountCtrl', function($scope, $state) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.logout = function() {
    var currentUser = Parse.User.current();
    if (currentUser) {
      // do stuff with the user
      Parse.User.logOut();
    }

    $state.go('login');
  };
});

// UUID Helper
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
