// pages/myhome/addmyaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toptitle: '新建地址',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: '/images/back.png',
    region: ['省/市/区', ' ', ' '],  //默认地
    customItem: ' ',
    addressMsg:{},
    province:'', //省
    city:'', //市
    area:'',//区
    contact:'', //联系人
    contactNumber:'',//联系电话
    address:''  //详细地址
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

  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
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