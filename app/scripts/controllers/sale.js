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
            selectedSeat:[],
            totalPrice:0
        }; 
        $scope.showSeatInfo = function(seat){
            console.log(seat);
            if(seat.ticketStatus!=='soldout'){
                seat.selected = !seat.selected;
            }            
            $scope.collectSelectedSeat();
            console.log('选中的座位',$scope.main.selectedSeat)
        }
        //收集选中的座位
        $scope.collectSelectedSeat = function(){
            var selectedList = [];
            var data =  $scope.main.ticketList;

            for(var i=0; i<data.length; i++){
                for(var j=0; j<data[i].length; j++){
                    if(data[i][j].selected){
                        selectedList.push(data[i][j]);
                    }
                }
            }
            $scope.main.selectedSeat = selectedList;
            $scope.calTotalPrice();
        }
        //计算总价
        $scope.calTotalPrice = function (){
            var totalPrice = 0;
            for(var i=0; i<$scope.main.selectedSeat.length; i++){
                totalPrice += $scope.main.selectedSeat[i].salePrice
            }
             $scope.main.totalPrice = totalPrice;
        }

        var mockData =  [
                [
                    {
                        seatId: '#001',
                        rowIndex:0,
                        colIndex:0,
                        rowNum:1,
                        colNum:1,
                        seatStatus: 'null',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#002',
                        rowIndex:0,
                        colIndex:1,
                        rowNum:1,
                        colNum:2,
                        seatStatus: 'null',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#003',
                        rowIndex:0,
                        colIndex:2,
                        rowNum:1,
                        colNum:3,
                        seatStatus: 'null',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#004',
                        rowIndex:0,
                        colIndex:3,
                        rowNum:1,
                        colNum:4,
                        seatStatus: 'seat',
                        ticketStatus: 'soldout',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#005',
                        rowIndex:0,
                        colIndex:4,
                        rowNum:1,
                        colNum:5,
                        seatStatus: 'seat',
                        ticketStatus: 'none',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#006',
                        rowIndex:0,
                        colIndex:5,
                        rowNum:1,
                        colNum:5,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#007',
                        rowIndex:0,
                        colIndex:6,
                        rowNum:1,
                        colNum:6,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                     {
                        seatId: '#008',
                        rowIndex:0,
                        colIndex:7,
                        rowNum:1,
                        colNum:7,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#009',
                        rowIndex:0,
                        colIndex:8,
                        rowNum:1,
                        colNum:8,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#0010',
                        rowIndex:0,
                        colIndex:9,
                        rowNum:1,
                        colNum:9,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                     {
                        seatId: '#011',
                        rowIndex:0,
                        colIndex:10,
                        rowNum:1,
                        colNum:10,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                     {
                        seatId: '#012',
                        rowIndex:0,
                        colIndex:11,
                        rowNum:1,
                        colNum:11,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#013',
                        rowIndex:0,
                        colIndex:12,
                        rowNum:1,
                        colNum:12,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#014',
                        rowIndex:0,
                        colIndex:13,
                        rowNum:1,
                        colNum:13,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#015',
                        rowIndex:0,
                        colIndex:14,
                        rowNum:1,
                        colNum:14,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#016',
                        rowIndex:0,
                        colIndex:15,
                        rowNum:1,
                        colNum:15,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#016',
                        rowIndex:0,
                        colIndex:15,
                        rowNum:1,
                        colNum:16,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },

                ],
                [
                    {
                        seatId: '#001',
                        rowIndex:1,
                        colIndex:0,
                        rowNum:2,
                        colNum:1,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#002',
                        rowIndex:1,
                        colIndex:1,
                        rowNum:2,
                        colNum:2,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#003',
                        rowIndex:1,
                        colIndex:2,
                        rowNum:2,
                        colNum:3,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#004',
                        rowIndex:1,
                        colIndex:3,
                        rowNum:2,
                        colNum:4,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#005',
                        rowIndex:1,
                        colIndex:4,
                        rowNum:2,
                        colNum:5,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#006',
                        rowIndex:1,
                        colIndex:5,
                        rowNum:2,
                        colNum:6,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#007',
                        rowIndex:1,
                        colIndex:6,
                        rowNum:2,
                        colNum:5,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                     {
                        seatId: '#008',
                        rowIndex:1,
                        colIndex:7,
                        rowNum:2,
                        colNum:5,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    }
                ],
                [
                    {
                        seatId: '#301',
                        rowIndex:2,
                        colIndex:0,
                        rowNum:3,
                        colNum:1,
                        seatStatus: 'null',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#302',
                        rowIndex:2,
                        colIndex:1,
                        rowNum:3,
                        colNum:2,
                        seatStatus: 'null',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#003',
                        rowIndex:2,
                        colIndex:2,
                        rowNum:3,
                        colNum:3,
                        seatStatus: 'null',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#004',
                        rowIndex:2,
                        colIndex:3,
                        rowNum:3,
                        colNum:4,
                        seatStatus: 'seat',
                        ticketStatus: 'soldout',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#005',
                        rowIndex:2,
                        colIndex:4,
                        rowNum:3,
                        colNum:5,
                        seatStatus: 'seat',
                        ticketStatus: 'none',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#006',
                        rowIndex:2,
                        colIndex:5,
                        rowNum:3,
                        colNum:5,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#007',
                        rowIndex:2,
                        colIndex:6,
                        rowNum:3,
                        colNum:6,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                     {
                        seatId: '#008',
                        rowIndex:2,
                        colIndex:7,
                        rowNum:3,
                        colNum:7,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#009',
                        rowIndex:2,
                        colIndex:8,
                        rowNum:3,
                        colNum:8,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#0010',
                        rowIndex:2,
                        colIndex:9,
                        rowNum:3,
                        colNum:9,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                     {
                        seatId: '#011',
                        rowIndex:2,
                        colIndex:10,
                        rowNum:3,
                        colNum:10,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                     {
                        seatId: '#012',
                        rowIndex:2,
                        colIndex:11,
                        rowNum:3,
                        colNum:11,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#013',
                        rowIndex:2,
                        colIndex:12,
                        rowNum:3,
                        colNum:12,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#014',
                        rowIndex:2,
                        colIndex:13,
                        rowNum:3,
                        colNum:13,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#015',
                        rowIndex:2,
                        colIndex:14,
                        rowNum:3,
                        colNum:14,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#016',
                        rowIndex:2,
                        colIndex:15,
                        rowNum:3,
                        colNum:15,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },
                    {
                        seatId: '#016',
                        rowIndex:2,
                        colIndex:15,
                        rowNum:3,
                        colNum:16,
                        seatStatus: 'seat',
                        ticketStatus: 'valid',
                        originPrice: 100,
                        salePrice:120
                    },

                ],
            ];
       function dealInitData(data){
            for(var i=0; i<data.length; i++){
                for(var j=0; j<data[i].length; j++){
                    data[i][j].selected = false
                }
            }
            return data
       }
        function init(){
            // [[{row,col,seatStatus, originalPrice，      	originalPriceColor, seatOID, 	ticketStatus,salePrice,	sellerOID},{…}],[…]]
            $scope.main.ticketList = dealInitData(mockData);

            
        }
        init();
        

  }]);
