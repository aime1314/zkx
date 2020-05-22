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
    addressbuy:null, // 获取设置地址来源
    defaultaddress:null, //设置默认收货地址
    newisDefault:0, //默认地址 0：否，1：是
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.addressbuy)
    if (options.addressbuy){
      this.setData({
        addressbuy: options.addressbuy
      })
    }
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
    that.getdefaultaddList()
  },

  //设置默认地址
  getdefaultaddshow:function(event){
    let that = this
    let addressId = event.currentTarget.dataset.addressid
    console.log(addressId)
    commRequest.requestPostForm("/miniapp/address/default",{addressId}, (res) => {
      that.setData({
        defaultaddress: addressId,
        newisDefault:1
      })
      
      if (that.data.addressbuy){
        wx.navigateBack({
          delta: 1
        })
      }else{
        that.getdefaultaddList()
      }
      
    });
  },

  //地址列表
  getdefaultaddList:function(){
    let that = this
    let param = {
      pageNo: that.data.page,
      pageSize: that.data.rows
    }
    commRequest.requestPostForm("/miniapp/address/myAddress", param, (res) => {
      that.setData({
        defaultaddList:res.data.data.rows,
        defaultaddress: res.data.data.rows.addressId
      })
    });
  },

  //编辑
  editaddress:function(e){
    let that = this
    let addressid = e.currentTarget.dataset.addressid
    let defaultid = e.currentTarget.dataset.defaultid
    let address = e.currentTarget.dataset.address
    let province = e.currentTarget.dataset.province
    let city = e.currentTarget.dataset.city
    let area = e.currentTarget.dataset.area
    let contact = e.currentTarget.dataset.contact
    wx.navigateTo({
      url: '/pages/myhome/address/addmyaddress?addressid=' + addressid + '&defaultid=' + defaultid + '&address=' + encodeURIComponent(address) + '&province='+ encodeURIComponent(province) + '&city='+encodeURIComponent(city)+'&area='+encodeURIComponent(area)+'&contact='+encodeURIComponent(contact)
    })
  },
  //删除
  deladdress:function(e){
    let that = this
    let addressId = e.currentTarget.dataset.addressid
    commRequest.requestPostForm("/miniapp/address/delete", {addressId}, (res) => {
      if(res.data.data){
        wx.showToast({
          title: '删除成功',
        })
        that.getdefaultaddList()
      }else{
        wx.showToast({
          title: '删除失败',
          icon:'none'
        })
      }
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