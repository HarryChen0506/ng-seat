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
  
  .directive('seat', function () {
    return{
      restrict:'EA',
      templateUrl:'templates/seat.html',
      scope:{
          seatOne:'=seatOne',
      },
      controller:'',
      link: function (scope, element, attr) {

      }
    }
  })
  .directive('ngSeatBox',function (){
      return {
        restrict: 'EA',
        scope: {
            // ngFileSelect: '&'
            selectedList: '=',
            seatList: '=',
            collectBox: '&'
        },
        controller: function ($scope){
            // $scope.fileObj = {
             
            // }
        },
        link: function ($scope,element,attrs){
            function calSelectBox(){
                // console.log('触发回掉函数')
                //先清空之前选中的
                $scope.seatList.forEach(function(item){
                    item.forEach(function(item){
                      item.selected = false;                    
                    })
                })
               
                //遍历每个座位
                // console.log($scope.seatList)
                var $seatList = $(element).find("div.seat-one"); 
                for(var i=0; i<$seatList.length; i++){
                  var $seatOne = $($seatList[i]);
                  //  console.log($($seatOne));
                  var rowIndex =  $seatOne.attr('data-seatoid').split('-')[0];
                  var colIndex =  $seatOne.attr('data-seatoid').split('-')[1];                 
                  if($seatOne.hasClass("seled")){
                      // console.log(rowIndex,colIndex);
                      //变更模型里的选中状态为true
                      findSeatListChecked(rowIndex,colIndex)
                  }
                }
                $scope.collectBox();
            }
            function findSeatListChecked(rowIndex,colIndex){
                $scope.seatList.forEach(function(item){
                  item.forEach(function(item){
                    if(rowIndex==item.rowIndex && colIndex==item.colIndex){
                      // console.log(rowIndex,colIndex,item)
                      item.selected =true;
                    }
                  })
                })
            }
             
              // console.log('自定义组件');
              // console.log($scope);          
              // console.log($scope.selectedList);          
              // console.log(attrs)
              // console.log($(element))  
              // $scope.collectBox({a:'hello'});
               //鼠标下按事件  mouseDown 
              $(element).on('mousedown', function(){  
                  console.log('mouseDown')
                  var $seatList = $(this).find("div.seat-one"); 
                  var evt = window.event || arguments[0];
                  //如果对象不是选座盒子，则ruturn        
                  var startX = (evt.x || evt.clientX); 
                  var startY = (evt.y || evt.clientY); 
                  var $selDiv = $("<div></div>");
                  $selDiv.css({
                      position:'absolute',
                      width: '0px',
                      height: '0px',
                      fontSize: '0px',
                      margin: '0px',
                      padding: '0px',
                      border: '1px dashed #0099FF',
                      backgroundColor: '#C3D5ED',
                      zIndex: '1000',
                      filter: 'alpha(opacity:60)',
                      opacity: 0.6,
                      display: 'none'
                  });
                  $selDiv.attr('id','selectDiv');
                  $selDiv.attr('class','selectDiv');
                  $selDiv.css({
                      left: startX + "px",
                      top: startY + "px"
                  })        
                  $selDiv.appendTo($('body'));
                  var isSelect = true;  //是否有选择框

                  var _x = null; 
                  var _y = null;
                  evt.stopPropagation();  

                  $(element).on('mousemove',function(){
                      // console.log('move')
                      evt = window.event || arguments[0];
                      if (isSelect) {
                          if($selDiv.css('display') == "none") { 
                              $selDiv.css('display',''); 
                          } 
                          _x = (evt.x || evt.clientX); 
                          _y = (evt.y || evt.clientY);
                          $selDiv.css('left', Math.min(_x, startX) + "px");
                          $selDiv.css('top',  Math.min(_y, startY) + "px");
                          $selDiv.css('width',  Math.abs(_x - startX-10) + "px");
                          $selDiv.css('height',  Math.abs(_y - startY-10) + "px");

                          var _l =  $selDiv.offset().left;   //选择盒子距离页面左边的距离
                          var _t =  $selDiv.offset().top;     //选择盒子距离页面顶部的距离
                          var _w = $selDiv.width();          //选择盒子宽度
                          var _h = $selDiv.height();         //选择盒子高度
                          // console.log('-l',_l)
                          // console.log('_t',_t)
                          for(var i=0; i<$seatList.length; i++){
                              var sl = $($seatList[i]).width() + $($seatList[i]).offset().left;   //元素最右边的坐标
                              var st = $($seatList[i]).height() + $($seatList[i]).offset().top;   //元素最下面的坐标

                              if ( sl > _l && 
                                  st > _t && 
                                  $($seatList[i]).offset().left < _l + _w &&
                                  $($seatList[i]).offset().top < _t + _h ) { 
                                  if (!$($seatList[i]).hasClass("seled")) { 
                                      $($seatList[i]).addClass("seled")
                                  }else{
                                    //  $($seatList[i]).removeClass("seled")
                                  }
                              } else { 
                                  // if ($($seatList[i]).hasClass("seled")) { 
                                  //   $($seatList[i]).removeClass("seled")
                                  // } 
                              } 
                          }
                      }  
                  }) 
                  
                  $('body').on('mouseup',function (){
                      console.log('mouseup')
                      isSelect = false; 
                      if($selDiv) { 
                          $selDiv.remove();
                          // $('.selectDiv').remove();
                      }
                      // if(true){
                      //     console.log(evt);
                      // } 
                      
                      //触发回调            
                      // value.methods() 
                      calSelectBox();
                      $seatList = null, _x = null, _y = null, $selDiv = null, startX = null, startY = null, evt = null;  
                      $('body').unbind(); 
                  })
                  

              })
              //点击事件             
              $(element).delegate('div.seat-one','click',function (){
                  console.log('代理事件')
                  console.log($(this))
                  var evt = window.event || arguments[0];
                  evt.stopPropagation(); 
                  if (!$(this).hasClass("seled")) { 
                      $(this).addClass("seled")
                  }else{
                      $(this).removeClass("seled")
                  }
                  //触发回调            
                  calSelectBox();
              })    
              // 右键取消所选
              $(element).on("contextmenu", function(){
                  // console.log('鼠标右键')            
                  var $seatList = $(this).find("div.seat-one"); 
                  for(var i=0; i<$seatList.length; i++){                  
                      $($seatList[i]).removeClass("seled")                    
                  }
                  //触发回调            
                  // value.methods() 
                  calSelectBox();
                  $seatList = null; 
              })          
        }
      }
  })
  .directive('scrollLoading',function(){
     return {
        restrict: 'EA',
        scope: { 
          onLoading: '&'
        },
        controller: function ($scope){
            // console.log('下拉加载组件init')
        },
        link: function ($scope,element,attrs){ 
                   
          //  $(element).on('click',function(){
          //     console.log('点击');
          //     console.log('this',$(this))
          //  })
           var distance = 50;
           var flag = false;
            var timerId;
           $(element).bind('scroll',function(){
              // console.log('滚动')
              // console.log('内容的高度',$(this)[0].scrollHeight);
              // console.log('滚动条距离顶部的距离',$(this).scrollTop());
              // console.log('父元素的高度',$(this).height());
              var scrollHeight = $(this)[0].scrollHeight;
              var scrollTop = $(this).scrollTop();
              var height = $(this).height();
              if(scrollHeight-scrollTop-height <distance){
                if(!flag){
                    loading();
                }
              }              
           })
          
           function loading (){
               flag = true;
               console.log('开始下拉加载');
               if(timerId){
                  clearTimeout(timerId)
               };
               timerId = setTimeout(function(){
                 console.log('可以再次加载')
                 $scope.onLoading();
                 console.log($scope);
                 flag = false;
               },3000)
           }

        }
      }
  })

