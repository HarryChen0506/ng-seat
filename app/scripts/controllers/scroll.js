'use strict';

/**
 * @ngdoc function
 * @name  下拉加载更多demo
 * @description
 * # SaleCtrl
 * Controller of the ngSeatApp
 */
angular.module('ngSeatApp')
  .controller('ScrollCtrl',["$scope","$state","$location","$stateParams",'$interval',
    function ($scope,$state,$location,$stateParams,$interval) {
        $scope.main={
            init: function(){
               
                $scope.list.push({a:1});
                $scope.list.push({b:1});
                $scope.list.push({c:1});
                 console.log('init');
                console.log($scope.list);
                $scope.$apply();
            }
        } 

        $scope.list = [{},{},{},{},{},{},{},{},{}];  

  }]);
