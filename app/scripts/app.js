'use strict';

/**
 * @ngdoc overview
 * @name ngSeatApp
 * @description
 * # ngSeatApp
 *
 * Main module of the application.
 */
angular
  .module('ngSeatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  
  .config(['$stateProvider', '$httpProvider','$locationProvider','$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
      function ($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide ) {    
        if (!window.location.origin) {
              window.location.origin = window.location.protocol + "//"
                + window.location.hostname
                + (window.location.port ? ':' + window.location.port : '');
        }
        $httpProvider.defaults.transformRequest = function(obj){
          var str = [];
          for(var p in obj){
            str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
          }
          return str.join("&");
        }
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.post = {
          'Content-Type':'application/x-www-form-urlencoded'
        }
         $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

      $stateProvider
        .state('app', {
          url: '/',
          views:{
            "":{
              controller: 'MainCtrl',
              templateUrl: 'views/main.html'
            }
          }
        })  
        .state('set', {
          url: '/set',
          views:{
            "":{
              controller: 'SetCtrl',
              templateUrl: 'views/set.html'
            }
          }
        })      

          
      //  $urlRouterProvider.otherwise("/404");
      }
    ])

