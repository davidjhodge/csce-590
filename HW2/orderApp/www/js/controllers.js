angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
  var self = this;
  $scope.signIn = function(user) {
    var username = user.username;
    var password = user.password;
    console.log("Username: " + username);
    console.log("Password: " + password);
    if (username && username.length > 0 && password && password.length > 0) {
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
    $state.go('tab.orders.order-detail', {
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
})

.controller('OrderDetailCtrl', function($scope, Orders) {
  $scope.getOrder = function(orderId) {
    $scope.order = Orders.get(orderId);
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
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
