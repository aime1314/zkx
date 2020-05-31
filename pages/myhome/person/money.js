// pages/myhome/integral.js
const commRequest = require('../../../utils/request.js');
const commonFun = require('../../../utils/util.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    toptitle: '我的收入',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: 'icon_back',
    monthIncome:'', // 本月收入
    todayIncome:'',  // 今天收入
    totalIncome:'',  // 总收入
    totalList:[],  // 收入明细
    detailListshow:false,
    newdetilListcurron:-1, // 默认显示最新一个月
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    commRequest.requestPostForm("/miniapp/personal/myIncome", {}, (res) => {
      that.setData({
        monthIncome: res.data.data.monthIncome.toFixed(2),
        todayIncome: res.data.data.todayIncome.toFixed(2),
        totalIncome: res.data.data.totalIncome.toFixed(2),
        totalList: res.data.data.totalList,
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

  //查看收入详情
  getshowdetilList:function(e){
    let that = this
    let detilListcurron = e.currentTarget.dataset.detaillistid
    console.log(detilListcurron)
    that.setData({
      newdetilListcurron: detilListcurron
    })
    if (that.data.newdetilListcurron == detilListcurron){
      that.setData({
        detailListshow:true
      })
    }
  },

  toBack: function () {
    wx.navigateBack({
      delta: 2
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