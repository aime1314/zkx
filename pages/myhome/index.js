// pages/myhome/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    toptitle: '我的',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: '',
    category: -1, //订单类型  订单类型：-1全部；0待回收；1已回收；2已取消；3待评价；4已评价
    orderTypeList: [
      // { category: -1, ordertypename: '全部', picurl:''},
      { category: 0, ordertypename: '待回收', picurl: '/images/my/icon_wartting.png'},
      { category: 1, ordertypename: '已回收', picurl: '/images/my/icon_wart.png'},
      { category: 2, ordertypename: '待评价', picurl: '/images/my/icon_talking.png'},
      { category: 3, ordertypename: '已评价', picurl: '/images/my/icon_talk.png'},
      { category: 4, ordertypename: '已取消', picurl: '/images/my/icon_cannel.png'},
    ],  //订单分类
    userInfo: {},
    hasUserInfo: false,
    canIUse: app.globalData.canIUse,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  gomyOrderList:function(e){
    let that = this
    let category = e.currentTarget.dataset.category
    wx.switchTab({
      url: '/pages/order/index?category=' + category,
      // url: '/pages/order/index',
    })
  },
  tointegral:function(){
    wx.navigateTo({
      url: '/pages/myhome/person/integral',
    })
  },
  tomymoney: function () {
    wx.navigateTo({
      url: '/pages/myhome/person/money',
    })
  },
  tomyadd: function () {
    wx.navigateTo({
      url: '/pages/myhome/address/add',
    })
  },
  tojoinus: function () {
    wx.navigateTo({
      url: '/pages/myhome/shop/joinus',
    })
  },
  tocity: function () {
    wx.navigateTo({
      url: '/pages/myhome/city/city',
    })
  },
  tofeedback:function(){
    wx.navigateTo({
      url: '/pages/myhome/feedback/feedback',
    })
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