angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
   var self = this;
   // console.log(this.address +" ****");
  $scope.showmap = function (argument) {
     console.log(self.address);
  }

  $scope.addorder = function (argument) {
    // body...
    alert("add order")
  }


})


.controller('LoginCtrl', function($scope,$state,Chats) {
   var self = this;
   // console.log(this.address +" ****");
  $scope.login = function (argument) {
     console.log($scope.loginName);
     $state.go("tab.dash")
     // window.localStorage.getItem("username");
  }

  $scope.Register= function (argument) {
    // body...
    
    $state.go("login.setup")
  }

})


.controller('SetupCtrl', function($scope,$state,Chats) {
   var self = this;
   // console.log(this.address +" ****");
$scope.Register= function (argument) {
    // body...
    // alert("process Registering here");
    Chats.adduser({username:$scope.email,password:$scope.password});
    $state.go("tab.dash");
  }

  
  $scope.cancel= function (argument) {
    // body...
    console.log("cancel");
    $state.go("login.login");
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
  // $scope.settings = {
  //   enableFriends: true
  // };
  $scope.enableFriends=false;

});
