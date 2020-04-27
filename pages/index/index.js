//index.js
//获取应用实例
const commRequest = require('../../utils/request.js');
const app = getApp()
Page({
  data: {
    toptitle: '纸壳侠',
    topbackflage:false,
    topclassName:'title_index',
    topiconurl:'/images/logo.png',
    imgUrls: [
      "/images/banner.png",
      "/images/banner.png",
      "/images/banner.png"
    ],
    rollData: ['公告一', '公告三', '公告二'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow:function(){
    this.getadvbanner()
  },
  getadvbanner: function () {
    var that = this;
    commRequest.requestPost("/miniapp/index/advbanner", {}, (res) => {
      console.info(res);
      debugger
    });
    // wx.request({
    //   url: app.globalData.host + "/miniapp/index/advbanner",
    //   method: "post",
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   success: (res) => {
    //     callback(res.data)
    //   },
    //   fail: () => {
    //   }
    // })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
