// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position("bottom"); //tabs abajo siempre en moviles
  $ionicConfigProvider.navBar.alignTitle("center"); //titulo del nav siempre centrada en moviles

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.company', {
    url: '/company',
    views: {
      'tab-company': {
        templateUrl: 'templates/tab-company.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.products', {
      url: '/products',
      views: {
        'tab-products': {
          templateUrl: 'templates/tab-products.html',
          controller: 'ProdsCtrl'
        }
      }
    })
  .state('tab.staff', {
      url: '/staff',
      views: {
        'tab-staff': {
          templateUrl: 'templates/tab-staff.html',
          controller: 'StaffCtrl'
        }
      }
    })
  .state('tab.contact', {
    url: '/contact',
    views: {
      'tab-contact': {
        templateUrl: 'templates/tab-contact.html',
        controller: 'ContactCtrl'
      }
    }
  })
  .state('tab.info', {
    url: '/info',
    views: {
      'info': {
        templateUrl: 'templates/info.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/company');

})


.controller('ProdsCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){

  //pillo datos del json y los envio al $scope de productos
  $http.get('js/data.json').success(function(data){
    $scope.productoshombre = data.hombre
    $scope.productosmujer = data.mujer
    $scope.productosaccesorios = data.accesorios
  }); 

  //declaracion de la funcion toggleDesc para el $scope de productos y poder usarla
  $scope.toggleDescripcion = function(item){
      item.resumido = !item.resumido;
  };


}])

.controller('StaffCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){

  //pillo datos del json y los envio al $scope de staff
  $http.get('js/data.json').success(function(data){
    $scope.staff = data.staff
  });
  

}])

.controller('ContactCtrl', function($scope){

  //obtengo la localizacion por el plugin de cordova
  $scope.getPosicion = function(){
    var form = this;
    navigator.geolocation.getCurrentPosition(function(position){
      form.posicion = position.coords.latitude + " -- " + position.coords.longitude
    });
  }

  //captura y envia datos form
  $scope.sendForm = function(){
    alert("SENT! WELL DONE");
  }


})