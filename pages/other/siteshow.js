// pages/other/siteshow.js
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
    toptitle: '站点详情',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: 'icon_back',
    agentname:null,//回收站名称
    agentinfoid:null, //回收站id
    address:'', //详情地址
    siteaddress:'',//服务站地址
    markers: [],
    mapControls: [], //地图控件  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let agentname = options.agentname
    let agentinfoid = options.agentinfoid
    let latitude = options.latitude
    let longitude = options.longitude
    let distance = options.distance
     that.setData({
      address:app.globalData.address
     })
    
    //根据经纬度获取服务站详细地址
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapkey
    })
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        qqmapsdk.reverseGeocoder({
          location: {latitude:latitude,longitude:longitude},
          success: function (res) {
            that.setData({
              agentname: agentname,
              agentinfoid: agentinfoid,
              markers:[
                {
                id: 0,
                iconPath: "/images/site.png",
                latitude: latitude,
                longitude: longitude,
                callout: {
                  content: "名称：" + decodeURIComponent(agentname) + "\r\地址：" + res.result.address + "\r\n距离：" + distance + "米",
                  bgColor: "#fff",
                  padding: "10px",
                  borderRadius: "5px",
                  borderWidth: "2px",
                  borderColor: "#07c160",
                  display: "ALWAYS"
                },
                width: 25,
                height: 32,
                clickable: true
              },
              ]
            })
          }

        })

      }
    })
    
    that.myMapCtx = wx.createMapContext("myMap", that)
    that.myMapCtx.moveToLocation({latitude: latitude, longitude: longitude})
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



  //指定预约
  gobuy:function(){
    wx.navigateTo({
      url: '/pages/buy/index?agentname=' + this.data.agentname + '&agentinfoid=' + this.data.agentinfoid
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