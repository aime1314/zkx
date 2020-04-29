// pages/myhome/myadd.js
const commRequest = require('../../../utils/request.js');
const commonFun = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toptitle: '我的地址',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: '/images/back.png',
    defaultaddList:[],   //我的地址
    page: 1,  //加载页面
    rows: 5, //每页记录
    isLastPage: false,
    isLoadInterface: false,
    windowHeight: 0, //页面高度

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          windowHeight: res.windowHeight
        });
        console.log("屏幕高度: " + res.windowHeight)
      }
    })
  },

  //设置默认地址

  //地址列表
  getdefaultaddList:function(){
    let that = this
    let param = {
      
    }
    commRequest.requestPostForm("/miniapp/address/default", param, (res) => {
      that.setData({
        defaultaddList:res
      })
    });
  },

  toBack: function () {
    wx.navigateBack({
      delta: 2
    })
  },
  addmyaddress:function(){
    wx.navigateTo({
      url: '/pages/myhome/address/addmyaddress',
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