// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ui.router', 'starter.controllers', 'starter.services', 'openfb'])

.run(function($ionicPlatform, OpenFB) {
  $ionicPlatform.ready(function() {

    appid = 'EXWkCHVJeyBIUuKU1BPPXhTTQZPHIRLLFcdITXgs';
    jskey = 'OMVXSdqgaWXXMI7q1rt1K5LLoQQs5FCYdjoOr8jA';
    Parse.initialize(appid, jskey);
    Parse.serverURL = 'https://parseapi.back4app.com';
    console.log("Connecting to database...");

    // OpenFb
    OpenFB.init('140023119858029', 'http://172.16.26.50:8100/oauthcallback.html');

    // Parse FacebookUtils
    window.fbAsyncInit = function() {
      Parse.FacebookUtils.init({ // this line replaces FB.init({
        appId      : '140023119858029', // Facebook App ID
        status     : true,  // check Facebook Login status
        cookie     : true,
        xfbml      : true,  // initialize Facebook social plugins on the page
        version    : 'v2.2' // point to the latest Facebook Graph API version
      });

      // Run code after the Facebook SDK is loaded.
      console.log("Parse.FacebookUtils initialized!")
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Login state
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // Create Account state
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  // Orders
  .state('tab.orders', {
    url: '/orders',
    views: {
      'tab-orders': {
        templateUrl: 'templates/tab-orders.html',
        controller: 'OrdersCtrl'
      }
    }
  })

  // Order detail
  .state('order-detail', {
    url: '/tab/orders/:orderId',
    params: {
      orderId: null
    },
    templateUrl: 'templates/order-detail.html',
    controller: 'OrderDetailCtrl'
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
