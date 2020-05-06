// pages/other/siteshow.js
const commRequest = require('../../utils/request.js');
const commonFun = require('../../utils/util.js');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toptitle: '站点详情',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: '/images/back.png',
    address:null, //详情地址
    markers: [],
    mapControls: //地图控件
      [
        { //定位
          id: 0,
          position: { //相对定位
            left: app.globalData.scWidth * 0.03,
            top: app.globalData.scHeight * 0.9,
            width: app.globalData.scWidth * 0.1
          },
          iconPath: "/images/vist.png",
          width:30,
          clickable: true
        },
        { //我的
          id: 1,
          position: { //相对定位
            left: app.globalData.scWidth * 0.87,
            top: app.globalData.scHeight * 0.9,
            width: app.globalData.scWidth * 0.1
          },
          iconPath: "/images/vist.png",
          clickable: true
        },
      ]
  },

  getLocation: function (e) { //获取当前位置，并移动地图到当前位置
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapkey
    })

    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        qqmapsdk.reverseGeocoder({
          location: '',
          success: function (res) {
            console.log(res)
            that.setData({
              address: res.result.address
            })
          }

        })

      }
    })
    this.myMapCtx.moveToLocation()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.myMapCtx = wx.createMapContext("myMap", this)
    this.getLocation()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  toBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})