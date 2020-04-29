// pages/order/index.js
const commRequest = require('../../utils/request.js');
const commonFun = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toptitle: '订单',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: '',
    myordersList: [],  //我的订单列表  
    category: -1, //订单类型  订单类型：-1全部；0待回收；1已回收；2已取消；3待评价；4已评价
    page: 1,  //加载页面
    rows: 5, //每页记录
    isLastPage: false,
    isLoadInterface: false,
    windowHeight:0, //页面高度
    userInfo: {}, //用户信息
    hasUserInfo: false, //是否已授权
    canIUse: app.globalData.canIUse, //授权按钮
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
    that.getMyorders(that.data.page)
  },
 
  //获取我的订单列表
  getMyorders: function (pageNum) {
    let that = this;
    let pageIndex = pageNum;
    let param = {
      "category":-1,
      "pageNo": pageIndex,
      "pageSize": that.data.rows
    }
    commRequest.requestPostForm("/miniapp/order/myorders", param, (res) => {
      that.setData({
        myordersList: res.data.data.rows,
        page: res.data.data.page,
        isLoadInterface: false,
        
      })
    });
  },
  // 加载下一页数据
  nextDataPage: function () {
    let that = this;
    let islastVar = that.data.isLastPage;
    if (!that.data.isLoadInterface) {
      if (!islastVar) {
        //防止在接口未执行完再次调用接口
        that.setData({
          isLoadInterface: true
        })

        let page = that.data.page * 1 + 1;

        that.getMyorders(page);

      }
    }

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
    console.log(111111)
  },
  orderListshow:function(){
    wx.navigateTo({
      url: '/pages/order/show',
    })
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