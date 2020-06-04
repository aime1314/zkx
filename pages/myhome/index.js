// pages/myhome/index.js
const commRequest = require('../../utils/request.js');
const commonFun = require('../../utils/util.js');
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
      { category: 4, ordertypename: '已评价', picurl: '/images/my/icon_talk.png'},
      { category: 2, ordertypename: '已取消', picurl: '/images/my/icon_cannel.png'},
    ],  //订单分类
    userInfo: {},
    hasUserInfo: 1,
    canIUse: app.globalData.canIUse,
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //用户信息
    wx.getSetting({
      success: res => {
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']) { //已授权
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              app.globalData.hasUserInfo = 1
              that.setData({
                userInfo:res.userInfo,
                hasUserInfo:1
              })
              console.log(that.data.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          that.setData({
            hasUserInfo:0
          })
        }
        
      }
    })
  },
  getUserInfo: function (e) {
    if(e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: 1
      })
      let usermsg = {
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
      }
      commRequest.requestPostForm("/miniapp/user/updateUserInfo", usermsg, (res) => {
        if (res.data.code == 200) {
          this.setData({
            contactNumber: res.data.data.phone
          })
          console.log(this.data.contactNumber)
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      });
    }else{
      this.setData({
        hasUserInfo: 0
      })
    }
  },

  gomyOrderList:function(e){
    let that = this
    let category = e.currentTarget.dataset.category
    app.globalData.category = category
    console.log(app.globalData.category)
    wx.switchTab({
      // url: '/pages/order/index?category=' + category,
      url: '/pages/order/index',
    })
  },
  tointegral:function(){
    wx.showToast({
      title: '暂未开放，敬请期待',
      icon:'none'
    })
    // wx.navigateTo({
    //   url: '/pages/myhome/person/integral',
    // })
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

//拨打电话
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '400-0633-345', 
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
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