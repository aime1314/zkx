//index.js
//获取应用实例
const commRequest = require('../../utils/request.js');
const commonChange = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    toptitle: '纸壳侠',
    topbackflage:false,
    topclassName:'title_index',
    topiconurl:'/images/logo.png',
    imgUrls: [],
    rollData: [],
    indexTypes: [],
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
    canIUse:app.globalData.canIUse,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //授权处理
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
    this.getNotice()
    this.getAdvBanner()
    this.gettTypes()
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toBuy: function (e) {
    let recoveryClassId = e.currentTarget.dataset.recoveryclassid
    let currontypeindex = e.currentTarget.dataset.currontypeindex
    wx.navigateTo({
      url: '/pages/buy/index?recoveryClassId=' + recoveryClassId + '&currontypeindex=' + currontypeindex,
    })
  },
  othersite:function(){
    wx.navigateTo({
      url: '/pages/other/other',
    })
  },

  //通知信息
  getNotice:function(){
    let that = this;
    commRequest.requestPost("/miniapp/index/notice", {}, (res) => {
      that.setData({
        rollData: res.data.data
      })
    });
  },

  //banner图
  getAdvBanner: function () {
    let that = this;
    commRequest.requestPost("/miniapp/index/advbanner", {}, (res) => {
      that.setData({
        imgUrls: res.data.data
      })
    });
  },

  //回收分类
  gettTypes:function(){
    let that = this;
    commRequest.requestPost("/miniapp/index/types", {}, (res) => {
      that.setData({
        indexTypes: res.data.data
      })
    });
  }
  
})
