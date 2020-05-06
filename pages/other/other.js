// pages/other/other.js
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
    toptitle: '周边回收站',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: '/images/back.png',
    nearbyList: [], // 周边回收站
    address:null, //详情地址

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'BOSBZ-QUB63-PEK35-32IJ6-AF7U6-NAFP4'  //V6VBZ-XAR3U-OPUVN-2QV3E-M2WQ7-O7BG4
    })

    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        qqmapsdk.reverseGeocoder({
          location: '',
          success: function (res) {
            console.log(res)
              that.setData({
                address: res.result.address
              })
          }

        })

        commRequest.requestPostForm("/miniapp/order/nearby", { "latitude": latitude, "longitude": longitude}, (res) => {
          console.log(res)
          if(res.data.code == 200){
            that.setData({
              nearbyList: res.data.data
            })
          }
         

        });


      }
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
  toBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  toshowsitemsg:function(){
    wx.navigateTo({
      url: '/pages/other/siteshow',
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