//index.js
//获取应用实例
const commRequest = require('../../utils/request.js');
const commonFun = require('../../utils/util.js');
const QR = require('../../utils/qrcode.js');
const app = getApp()
Page({
  data: {
    toptitle: '纸壳侠',
    topbackflage:false,
    topclassName:'title_index',
    topiconurl:'/images/logo.png',
    imgUrls: [], //banner图
    rollData: [], //通知公告
    indexTypes: [], //回收类型
    indicatorDots: true, //banner图设置
    vertical: false, //
    autoplay: true, //
    circular: false, //
    interval: 2000, //
    duration: 500, //
    previousMargin: 0, //
    nextMargin: 0, //
    faceCode:null,  //面对面二微码
    faceFlag:false  //是否显示面对面
    // userInfo: {}, //用户信息
    // hasUserInfo: false, //是否已授权
    // canIUse: app.globalData.canIUse, //授权按钮
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
    let recoveryclassid = e.currentTarget.dataset.recoveryclassid
    let currontypeindex = e.currentTarget.dataset.currontypeindex
    wx.navigateTo({
      url: '/pages/buy/index?recoveryclassid=' + recoveryclassid + '&currontypeindex=' + currontypeindex,
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
  },

  //面对面收货
  getfaceshow:function(){
    let that = this
    commRequest.requestPostForm("/miniapp/index/openQRcode", {}, (res) => {
      // var base64 = wx.arrayBufferToBase64(res.data);
      // console.log(res.data)
      that.setData({
        faceFlag:true,
        faceCode: "data:image/png;base64," + res.data.data
      })
    });
  },


//关闭 
  getfaceclose:function(){
    let that = this
    that.setData({
      faceFlag:false
    })
  },
  

 //创建二微码
  createQrCode: function (content, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(content, canvasId, cavW, cavH);
    this.canvasToTempImage(canvasId);
  },

  //获取临时缓存图片路径，存入data中
  canvasToTempImage: function (canvasId) {
    let that = this;
    wx.canvasToTempFilePath({
      canvasId,   // 这里canvasId即之前创建的canvas-id
      success: function (res) {
        let tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({       // 如果采用mpvue,即 this.imagePath = tempFilePath
          faceFlag: true,
          faceCode: tempFilePath
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  //拨打电话
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '800-800-8800',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  
})
