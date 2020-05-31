// pages/other/other.js
const commRequest = require('../../utils/request.js');
const commonFun = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toptitle: '周边回收站',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: 'icon_back',
    nearbyList: [], // 周边回收站
    address:null, //详情地址

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      address:app.globalData.address
    })
    console.log(app.globalData.latitude)
    commRequest.requestPostForm("/miniapp/order/nearby", { "latitude": app.globalData.latitude, "longitude": app.globalData.longitude}, (res) => {
      console.log(res)
      if(res.data.code == 200){
        that.setData({
          nearbyList: res.data.data
        })
        console.log(that.data.nearbyList)
      }
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
  toBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  toshowsitemsg:function(e){
    let agentname = e.currentTarget.dataset.agentname
    let agentinfoid = e.currentTarget.dataset.agentinfoid
    let latitude = e.currentTarget.dataset.latitude
    let longitude = e.currentTarget.dataset.longitude
    let distance = e.currentTarget.dataset.distance
    let address = e.currentTarget.dataset.address
    wx.navigateTo({
      url: '/pages/other/siteshow?agentname=' + encodeURIComponent(agentname) + '&agentinfoid=' + agentinfoid + '&latitude=' + latitude + '&longitude=' + longitude + '&distance=' + distance + '&address=' + encodeURIComponent(address)
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