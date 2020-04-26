//index.js
//获取应用实例

Page({
  data: {
    toptitle: '纸壳侠',
    topbackflage:false,
    topclassName:'title_index',
    topiconurl:'/images/logo.png',
    background: ['1', '2', '3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.getSetting({
      success(res) {
        
      }
    })
  },
  toBuy: function () {
    wx.navigateTo({
      url: '/pages/buy/index',
    })
  },
  othersite:function(){
    wx.navigateTo({
      url: '/pages/other/other',
    })
  },
  
})
