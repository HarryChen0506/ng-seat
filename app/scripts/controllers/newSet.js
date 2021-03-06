'use strict';

/**
 * @ngdoc function
 * @name ngSeatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngSeatApp
 */
angular.module('ngSeatApp')
  .controller('newSetCtrl',["$scope","$state","$location","$stateParams",'$interval',
    function ($scope,$state,$location,$stateParams,$interval) {
        
        $scope.main = {
            title: '设置座位',
            row: 5,
            col: 5,
            seatList:[],
            selectedList: [],
            seat:{
                name: '座位',
                rowIndex: '',
                colIndex: '',
                rowNum: '',
                colNum:'',
                rowInfo:'', //行标注
                isOffset: 'false',  //是否偏移半个座位
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
        //ui相关的配置
        $scope.ui = {
            size: 50
        }
        //放大
        $scope.zoomIn = function (){
            if($scope.ui.size<80){
                $scope.ui.size +=10
            }
        }
        //缩小
        $scope.zoomOut = function (){
            if($scope.ui.size>20){
                $scope.ui.size -=10
            }
        }
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
       
        $scope.calSelectedList = function (){
            // console.log($scope.main.seatList);
            //计算选中的座位
            $scope.main.selectedList = [];
            $scope.main.seatList.forEach(function (item){
                item.forEach(function (seat){
                    if(seat.selected){
                        // console.log(seat);
                        $scope.main.selectedList.push(seat)
                    }                    
                })
            }) 
           console.log($scope.main.selectedList);
        }
        //重置行与列
        $scope.resetRowCol = function(){
            $scope.initTable($scope.main.row, $scope.main.col);
        }
        //设置座位
        $scope.setSeatTable = function (){
             var seatProps = $scope.main.seatSet.seat;
            //设置座位
            var arr = []; //座位号序列
            for(var i= parseInt(seatProps.colNum_from);  i<= parseInt(seatProps.colNum_to); i++){
                arr.push(i);
            }
            $scope.main.selectedList.forEach((item,index)=>{                
                for(var key in seatProps ){                    
                    item[key] = seatProps[key];
                } 
                item.colNum = arr[index];              
            })
        }
        // 添加票面列表
        $scope.addOriginPrice = function (){
            var obj = {
                originPriceNum: $scope.main.seatSet.originPriceNum,
                color: $scope.main.seatSet.color
            }
             $scope.main.seatSet.originPriceList.push(obj);
        }
        //删除票面
        $scope.removeOriginPrice = function (item, list){
            var index = list.indexOf(item);
            if (index > -1) {
                list.splice(index, 1);
            }
        }
       //设置票面
       $scope.setSeatOriginPrice = function (){
            $scope.main.selectedList.forEach((item,index)=>{                
               item.originPrice = $scope.main.seatSet.originPrice   
            })
       }
       //售票设置
       $scope.setSeatTicketStatus = function (){
            $scope.main.selectedList.forEach((item,index)=>{                
               item.ticketStatus = $scope.main.seatSet.ticketStatus   
            })
       }
       //取消全选
       $scope.cancelSelected = function (){
            //取消选择
            $scope.main.selectedList.forEach((item)=>{
                item.selected = false
            })
            $scope.calSelectedList();
       }
       //自定义指令收集选中的盒子
       $scope.collectBox = function (){
           console.log('父元素收集盒子');           
           $scope.calSelectedList();
       }
       //设置行信息（几排和是否偏移半个座位）
       $scope.result_box_flag = false;
       $scope.selectedSeatInfo = null;
       $scope.setRowInfo = function (seat){
           console.log(seat);
           $scope.selectedSeatInfo = seat;
            //    $scope.confCallbackMsg.showMsg('选座')
            $scope.result_box_flag = true;
       }
       $scope.close_result_box = function (){
            $scope.result_box_flag = false;
            $scope.selectedSeatInfo = null;
       }
       //设置信息-确定
       $scope.confirm_seatInfo = function (){
           $scope.selectedSeatInfo.rowInfo = $scope.main.seatSet.seatInfo.rowIndex;
           $scope.selectedSeatInfo.isOffset = $scope.main.seatSet.seatInfo.isOffset;
           $scope.close_result_box();
       }

       //选择盒子的交互
       $scope.isEdit = false;
       $scope.doSelect = false;
        //点击事件
        $scope.selectSeat = function (seat){
            seat.selected = !seat.selected;
            $scope.doSelect = seat.selected;
            //  console.log(seat)
             $scope.calSelectedList();
        }
        //鼠标按住
        $scope.selectMousedown = function(seat){
            $scope.isEdit = true;
            // $scope.doSelect = !$scope.doSelect;  
            //  seat.selected =  $scope.doSelect;                               
            // console.log('鼠标下按',$scope.isEdit);
            //  console.log(seat)
        }        
        //鼠标按住
        $scope.selectMouseup = function(seat){
            $scope.isEdit = false;
            // console.log('鼠标松开',$scope.isEdit);
            //  console.log(seat) 
            $scope.doSelect = !$scope.doSelect; 
            $scope.calSelectedList();
        }
        //鼠标滑动
         $scope.selectMouseover = function(seat){
             if($scope.isEdit){
                seat.selected = $scope.doSelect;
                // console.log('鼠标滑动',$scope.isEdit);
                // console.log(seat)
             }         
        }      







       
        function init(){
            $scope.initTable($scope.main.row, $scope.main.col);
        }
        init();
        

  }]);
