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
        $scope.flag= {load: false};
        $scope.getMore = function(){
            $scope.flag.load = true;
            var timerId = setTimeout(function(){
                $scope.list.push({a:1});
                $scope.list.push({b:1});
                $scope.list.push({c:1});               
                console.log($scope.list);
                $scope.$apply();
                clearTimeout(timerId);
                $scope.flag.load = false;
            },3000)
        }
        $scope.list = [{},{},{},{},{},{},{},{},{}];  

  }]);
