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
        .state('set2', {
          url: '/set2',
          views:{
            "":{
              controller: 'SetCtrl',
              templateUrl: 'views/set.html'
            }
          }
        })   
        .state('sale',{
          url: '/sale',
          views:{
            "":{
              controller: 'SaleCtrl',
              templateUrl: 'views/sale.html'
            }
          }
        })   
        .state('scroll',{
          url: '/scroll',
          views:{
            "":{
              controller: 'ScrollCtrl',
              templateUrl: 'views/scrollDemo.html'
            }
          }
        })   

          
      //  $urlRouterProvider.otherwise("/404");
      }
  ])
  .controller('appCtrl',['$scope','$timeout',function ($scope,$timeout){
      //disabled UM editor 上传功能
      // UMEDITOR_CONFIG.imageUrl = "javascript:return false;";
      //loading
      $scope.loading = false;
      //回调对话框
      $scope.confCallbackMsg = {};
      $scope.confCallbackMsg.showMsg = function (msg,next) {
        $scope.confCallbackMsg.msg =msg;
        $scope.confCallbackMsg.open = true;
        $scope.confCallbackMsg.close = function () {
          $scope.confCallbackMsg.open = false;
          if(next && typeof next == 'function'){
            next();
          }
        }
      } 
      $scope.message ={}
      $scope.showMsg = function (msg,noDown) {
        
         $scope.message.msg = msg;
         $scope.message.open = true;
         //如果没有noDown,就开启倒计时
         if(!noDown){
           $timeout(function () {
             $scope.closeMsg();
           },1000)
         }
       };
       $scope.closeMsg = function () {
         $scope.message.open = false;
       }
      
      
      //时间的格式转化
    Date.prototype.format = function(format) {
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": this.getMinutes(),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
    } 
    // console.log(new Date().format('yyyy-MM-dd hh:mm:ss'));   

  }])
  

