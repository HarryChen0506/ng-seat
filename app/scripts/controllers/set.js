'use strict';

/**
 * @ngdoc function
 * @name ngSeatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngSeatApp
 */
angular.module('ngSeatApp')
  .controller('SetCtrl',["$scope","$state","$location","$stateParams",'$interval',
    function ($scope,$state,$location,$stateParams,$interval) {
        
        $scope.main = {
            title: '设置座位',
            row: 5,
            col: 5,
            seatList:[],
            selectedList: [],
            seat:{
                name: '座位',
                rowIndex: 0,
                colIndex: 0,
                rowNum: 1,
                colNum:1,
                seatStatus: 'null',
                ticketStatus: 'none',
                originPrice: {
                    originPrice: 0,
                    color: ''
                },
                selected: false
            },
            seatSet: {
                seat: {
                    name: '座位',                
                    rowNum: 1,
                    colNum_from:1,
                    colNum_to:1, 
                    seatStatus: 'null',                   
                },                
                ticketStatus: 'none',
                originPrice: {
                    originPriceNum: 0,
                    color: ''
                },
                seatStatusList:[
                    {
                        name: '空',
                        value: 'null',
                        code: 0
                    },{
                        name: '座位',
                        value: 'seat',
                        code: 1
                    }
                ],
                ticketStatusList: [
                    {
                        name: '未定义',
                        value: 'none',
                        code: 0
                    },{
                        name: '可卖',
                        value: 'valid',
                        code: 1
                    },{
                        name: '已卖',
                        value: 'soldout',
                        code: 2
                    }
                ],
                originPriceList: [],
                originPriceNum: 0,
                colorList: ['#ff5722','#03a9f4','#8bc34a','#9c27b0'],
                color: ''               
            }
        };
        $scope.initTable = function(row,col){
            $scope.main.seatList = [];
            for(var i=0; i<row; i++){
                var rowList = [];
                for(var j=0; j<col; j++){
                    var seat = angular.copy($scope.main.seat);                   
                    seat.rowIndex = i;
                    seat.colIndex = j;
                    rowList.push(seat)
                }
                $scope.main.seatList.push(rowList);
            }        
        }
        $scope.selectSeat = function (seat){
             seat.selected = !seat.selected;
            //  console.log(seat)
             $scope.calSelectedList();
        }
        $scope.calSelectedList = function (){
            //计算选中的座位
            $scope.main.selectedList = [];
            $scope.main.seatList.forEach(function (item){
                item.forEach(function (seat){
                    if(seat.selected){
                        $scope.main.selectedList.push(seat)
                    }                    
                })
            }) 
           console.log($scope.main.selectedList);
        }
       

       
        function init(){
            $scope.initTable($scope.main.row, $scope.main.col);
        }
        init();

  }]);
