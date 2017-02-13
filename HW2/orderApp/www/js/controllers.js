angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
  var self = this;
  $scope.signIn = function(user) {
    var username = user.username;
    var password = user.password;
    console.log("Username: " + username);
    console.log("Password: " + password);
    if (username && username.length > 0 && password && password.length > 0) {
      $state.go("tab.dash");
    } else {
      console.error("Username and password were not valid strings.");
    }
  }
})

.controller('DashCtrl', function($scope) {})

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
