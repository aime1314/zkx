// pages/buy/index.js
const commRequest = require('../../utils/request.js');
const commonFun = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toptitle: '预约回收',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: '/images/back.png',
    priceMenu:[], //回收总类型
    recoveryclassTab:0, //当前类型
    recoveryPriceList:[], //价格明细
    maxprice:0, //最高回收价
    minprice:0, //最低回收价
    defaultAddress:{},  //默认回收地址
    date: commonFun.formatTime(new Date).split(' ')[0],//当前日期
    time: commonFun.formatTime(new Date).split(' ')[1], //时间
    bookingtype:1,//预约类型 1：预约上门  2：立即预约，
    bookingtypecurron:1, //
    isFree:0, //是否赠送  0：是赠送 1：是卖钱
    flag: 0, //当前输入字数
    noteMaxLen: 300, // 最多放多少字
    info: "",
    noteNowLen: 0,//备注当前字数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option.currontypeindex)
    console.log(option.recoveryclassid)
    console.log(this.data.date)
    this.setData({
      recoveryclassTab: option.recoveryclassid
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
  onShow: function (option) {
    this.getPriceMenu(this.data.recoveryclassTab)
    this.getdefaultAddress()
  },

  //回收分类价格
  getPriceMenu: function (recoveryclassid) {
    let that = this;
    commRequest.requestPost("/miniapp/order/priceMenu", {}, (res) => {
      that.setData({
        priceMenu: res.data.data
      })
      for (var i = 0; i < that.data.priceMenu.length; i++) {
        if (recoveryclassid == that.data.priceMenu[i].recoveryClassId) {
          that.setData({
            recoveryPriceList: that.data.priceMenu[i].recoveryPriceList.sort(function (a, b) {
              return a.price - b.price
            }),
            recoveryclassTab: recoveryclassid
          })
        }
      }
      that.setData(
        {
          maxprice: that.data.recoveryPriceList[that.data.recoveryPriceList.length - 1].price + that.data.recoveryPriceList[0].unit,
          minprice: that.data.recoveryPriceList[0].price + that.data.recoveryPriceList[0].unit
        }
      )
      
    });
  },

//查询其他分类价格
  getPriceMenuList: function (event){
    let that = this;
    let newrecoveryclassid = event.currentTarget.dataset.recoveryclassid
    for (var i = 0; i < that.data.priceMenu.length; i++) {
      if (newrecoveryclassid == that.data.priceMenu[i].recoveryClassId) {
        that.setData({
          recoveryPriceList: that.data.priceMenu[i].recoveryPriceList.sort(function (a, b) {
            return a.price - b.price
          }),
          recoveryclassTab: newrecoveryclassid
        })
      }
    }
    if (that.data.recoveryPriceList){
      that.setData(
        {
          maxprice: that.data.recoveryPriceList[that.data.recoveryPriceList.length - 1].price + that.data.recoveryPriceList[0].unit,
          minprice: that.data.recoveryPriceList[0].price + that.data.recoveryPriceList[0].unit
        }
      )
    }
  },

  //查询默认下单地址
  getdefaultAddress:function(){
    let that = this;
    let param = {
      
    }
    commRequest.requestPost("/miniapp/order/defaultAddress", {}, (res) => {
      that.setData({
        defaultAddress:res.data.data
      })
    });
  },

  //日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //时间
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  //预约时间
  getbookingDate:function(e){
    let that = this
    let bookingtype = e.currentTarget.dataset.bookingtype
    that.setData({
      bookingtype: bookingtype,
      bookingtypecurron: bookingtype,
      date: commonFun.formatTime(new Date).split(' ')[0],
      time: commonFun.formatTime(new Date).split(' ')[1],
    })
    
  },

  //赠送处理
  getisFree:function(e){
    let that = this
    if(that.data.isFree == 0){
      that.setData({
        isFree: 1
      })
    }else{
      that.setData({
        isFree: 0
      })
    }
  },

  //预约下单
  getbookingOrder:function(){
    let that = this;
    let data = {
      "addressId": that.data.defaultAddress.addressId,
      "endTime": that.data.date + ' ' + that.data.time,
      "isFree": that.data.isFree,
      "recoveryClass": that.data.recoveryclassTab,
      "remark": that.data.info,
      "startTime": that.data.date +' '+ that.data.time
    }
    commRequest.requestPost("/miniapp/order/booking", JSON.stringify(data), (res) => {
      if(res.data.data){
        that.setData({ info: '', noteNowLen: 0, flag: 0 })
        wx.showToast({
          title: '预约成功',
        })
        wx.switchTab({
          url: '/pages/order/index',
        })
      }else{
        wx.showToast({
          title: res.data.message,
        })
      }
    });
  },

  //我的地址簿
  myaddress:function(){
    wx.navigateTo({
      url: '/pages/myhome/address/add',
    })
  },
  toBack: function () {
    wx.navigateBack({
      delta: 2
    })
  },
  // 监听字数
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({ info: value, noteNowLen: len })

  },
  // 提交清空当前值
  bindSubmit: function () {
    var that = this;
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 1500,
      mask: false,
      success: function () {
        that.setData({ info: '', noteNowLen: 0, flag: 0 })
      }
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