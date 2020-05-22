// pages/buy/index.js
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
    toptitle: '预约回收',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: '/images/back.png',
    agentname: null,//回收站名称
    agentinfoid: null, //回收站id 0：不是指定单
    priceMenu:[], //回收总类型
    recoveryclassTab:0, //当前类型
    recoveryPriceList:[], //价格明细
    latitude: '', //用户所在地经度
    longitude:'',  //用户所在地纬度
    sysUserId:'', //定价查询
    maxprice:0, //最高回收价
    minprice:0, //最低回收价
    address:null, //地址
    area:null, //区
    city:null, //市
    province:null, //省
    unit:null, //单位
    defaultAddress:{},  //默认回收地址
    date: commonFun.formatTime(new Date).split(' ')[0],//当前日期
    time: commonFun.formatTime(new Date).split(' ')[1], //时间
    bookingtype:1,//预约类型 1：预约上门  2：立即上门，
    bookingtypecurron:2, //
    isFree:1, //是否赠送  0：是赠送 1：是卖钱
    flag: 0, //当前输入字数
    noteMaxLen: 300, // 最多放多少字
    info: "",
    noteNowLen: 0,//备注当前字数
    loadingTime:''  //定时器
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let agentname = decodeURIComponent(option.agentname)
    let agentinfoid = option.agentinfoid
    let recoveryclassid = option.recoveryclassid
    this.setData({
      agentname: agentname ? agentname:'',
      agentinfoid: agentinfoid ? agentinfoid : 'null',
      recoveryclassTab: recoveryclassid ? recoveryclassid : ''
    })
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapkey  
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
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: '',
          success: function (res) {
            console.log(res)
            that.setData({
              address:res.result.address,
              area:res.result.address_component.district,
              city:res.result.address_component.city,
              province:res.result.address_component.province,
            })
            that.getPriceMenu(that.data.recoveryclassTab)
          }

        })
        
        that.getdefaultAddress()
      }
    })
    
  },

  //回收分类价格
  getPriceMenu: function (recoveryclassid) {
    let that = this
    let vist = {
      // latitude: that.data.latitude,
      // longitude: that.data.longitude
      province:that.data.province,
      city:that.data.city,
      area:that.data.area,
      address:that.data.address
    }
    commRequest.requestPostForm("/miniapp/order/priceMenu", vist, (res) => {
      if(res.data.code == 200){
        that.setData({
          priceMenu: res.data.data,
        })
        for (var i = 0; i < res.data.data.length; i++) {
          if (recoveryclassid == that.data.priceMenu[i].recoveryClassId) {
            that.setData({
              recoveryPriceList: that.data.priceMenu[i].recoveryPriceList.sort(function (a, b) {
                return a.price - b.price
              }),
              recoveryclassTab: recoveryclassid,
              maxprice: that.data.priceMenu[i].maxPrice,
              minprice: that.data.priceMenu[i].minPrice,
              unit: that.data.priceMenu[i].unit,
              agentId: that.data.priceMenu[i].agentinfoid,
              sysUserId: that.data.priceMenu[i].sysUserId
            })
          }
        }
      }else if(res.data.code == 500){
        wx.showToast({
          title: res.data.message,
          icon:'none',
          success(res){
            that.setData({
              loadingTime:setInterval(function(){
                console.log('定时器')
                wx.navigateBack({
                  delta: 1
                })
              },3000)
            })
            
          }
        })
      }else{
        wx.showToast({
          title: res.data.message,
          icon:'none',
        })
      }
     
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
          recoveryclassTab: newrecoveryclassid,
          maxprice: that.data.priceMenu[i].maxPrice,
          minprice: that.data.priceMenu[i].minPrice,
          unit: that.data.priceMenu[i].unit,
          agentId: that.data.priceMenu[i].agentinfoid,
          sysUserId: that.data.priceMenu[i].sysUserId
        })
      }
    }
    // if (that.data.recoveryPriceList){
    //   that.setData(
    //     {
    //       maxprice: that.data.recoveryPriceList[that.data.recoveryPriceList.length - 1].price,
    //       minprice: that.data.recoveryPriceList[0].price
    //     }
    //   )
    // }
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
      "sysUserId": that.data.sysUserId,
      "addressId": that.data.defaultAddress.addressId,
      "agentId": that.data.agentinfoid,
      "endTime": that.data.date + ' ' + that.data.time,
      "isFree": that.data.isFree,
      "recoveryClass": that.data.recoveryclassTab,
      "remark": that.data.info,
      "startTime": that.data.date +' '+ that.data.time
    }
    commRequest.requestPost("/miniapp/order/booking", data, (res) => {
      if (res.data.code == 200){
        app.globalData.category = -1;
        that.setData({ 
          info: '', 
          noteNowLen: 0, 
          flag: 0,
           })
           wx.showToast({
             title: '预约成功',
             icon:'success',
             duration: 1500,
             mask: false,
             success: function () {
               that.setData({ info: '', noteNowLen: 0, flag: 0 })
               wx.switchTab({
                 url: '/pages/order/index',
               })
             }
           })
        
      }else{
        wx.showToast({
          title: res.data.message,
          icon:'none'
        })
      }
    });
  },

  //我的地址簿
  myaddress:function(e){
    let addressbuy = e.currentTarget.dataset.addressbuy
    wx.navigateTo({
      url: '/pages/myhome/address/add?addressbuy=' + addressbuy,
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
    clearInterval(this.date.loadingTime)
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