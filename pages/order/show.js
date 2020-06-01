// pages/ordershow/index.js
const commRequest = require('../../utils/request.js');
const commonFun = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toptitle: '订单详情',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: 'icon_back',
    ordersn:'', //订单详情
    myorderdetails:{}, // 订单详情
    goodsList:[], //回收明细
    amonutmoney:'', //订单总金额
    intergin:'', //订单积分
    phoneNumber:'', //回收员电话
    orderCommentRes:[], //我的评价
    flag: 0, //评星数量
    noteMaxLen: 300, // 最多放多少字
    info: "",
    noteNowLen: 0,//备注当前字数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options.ordersn)
    that.setData({
      ordersn: options.ordersn
    })
    that.getMyorderdetails(options.ordersn)
  },
  

  //订单详情
  getMyorderdetails: function (orderSn) {
    let that = this;
    commRequest.requestPostForm("/miniapp/order/details", {orderSn}, (res) => {
      that.setData({
        myorderdetails:res.data.data,
        goodsList: res.data.data.goodsList,
        phoneNumber: res.data.data.recoveryUserContact ? res.data.data.recoveryUserContact:''
      })

      if (res.data.data.goodsList){
        var price = []
        for (var i = 0; i < res.data.data.goodsList.length; i++){
          price.push(Number((Number(res.data.data.goodsList[i].recoveryNumber*100) * Number(res.data.data.goodsList[i].recoveryUnitPrice*100)/10000).toFixed(2)))
        }
        // console.log(price)
        that.setData({
          amonutmoney: that.sum(price) ? that.sum(price).toFixed(2):'0'
        })
      }
      if (res.data.data.orderCommentRes){
        that.setData({
          orderCommentRes: res.data.data.orderCommentRes
        })
        console.log(that.data.orderCommentRes)
      }

    });
  },

  //计算订单总金额
  sum: function (arr){
    console.log(arr)
    return arr.reduce(function (prev, curr, idx, arr) {
      return prev + curr
    });
  },

  //评论订单
  comment:function(){
    let that = this;
    let commentmsg = {
      level: that.data.flag,
      orderSn: that.data.ordersn,
      content: that.data.info
    }
    commRequest.requestPostForm("/miniapp/order/comment", commentmsg, (res) => {
      if(res.data.code == 200){
        that.bindSubmit()
      }else{
        wx.showToast({
          title: '请输入评价信息',
          icon:'none',
        })
      }
    });
  },
  toBack: function () {
    wx.navigateBack({
      delta: 2
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
  onShow: function (options) {
    
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

  //拨打电话
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
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
        this.onLoad()
      }
    })

  },
  changeColor1: function () {
    var that = this;
    that.setData({
      flag: 1
    });
  },
  changeColor2: function () {
    var that = this;
    that.setData({
      flag: 2
    });
  },
  changeColor3: function () {
    var that = this;
    that.setData({
      flag: 3
    });
  },
  changeColor4: function () {
    var that = this;
    that.setData({
      flag: 4
    });
  },
  changeColor5: function () {
    var that = this;
    that.setData({
      flag: 5
    });
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