const commRequest = require('../../../utils/request.js');
const commonFun = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toptitle: '覆盖城市',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: 'icon_back',
    hotcityList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    commRequest.requestPostForm("/miniapp/personal/opened", {}, (res) => {
      that.setData({
        hotcityList: res.data.data
      })
    });
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
  gethotcity:function(){

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