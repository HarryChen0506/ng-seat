'use strict';

/**
 * @ngdoc function
 * @name ngSeatApp.controller:SaleCtrl
 * @description
 * # SaleCtrl
 * Controller of the ngSeatApp
 */
angular.module('ngSeatApp')
  .controller('SaleCtrl',["$scope","$state","$location","$stateParams",'$interval',
    function ($scope,$state,$location,$stateParams,$interval) {
        
        $scope.main = {
            title: '售票系统',
           
        }; 
       
        function init(){
            
        }
        init();
        

  }]);
