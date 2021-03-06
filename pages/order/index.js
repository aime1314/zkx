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
    category: app.globalData.category, 
    page: 1,  //加载当前页
    rows: 10, //每页记录
    totalPage:null, //总页数
    isLastPage: false,
    isLoadInterface: false,
    windowHeight:0, //页面高度
    orderTypeList: [
      { category: -1, ordertypename: '全部' }, 
      { category: 0, ordertypename: '待回收' }, 
      { category: 1, ordertypename: '已回收' }, 
      { category: 4, ordertypename: '已评价' }, 
      { category: 2, ordertypename: '已取消' },
    ],  //订单分类
    ordercurron: -1,  //订单选择 //订单类型  订单类型：-1全部；0待回收；1已回收；2已取消；3待评价；4已评价
    userInfo: {}, //用户信息
    hasUserInfo: false, //是否已授权
    canIUse: app.globalData.canIUse, //授权按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
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
    
    console.log(app.globalData.category)    
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
    that.getMyorders(app.globalData.category, that.data.page)
  },
 
  //获取我的订单列表
  getMyorders: function (category,pageNum) {
    let that = this;
    let param = {
      "category": category,
      "pageNo": pageNum,
      "pageSize": that.data.rows
    }
    commRequest.requestPostForm("/miniapp/order/myorders", param, (res) => {
      that.setData({
        myordersList: res.data.data.rows,
        page: res.data.data.page,
        totalPage: res.data.data.totalPage,
        isLoadInterface: false,
      })
      wx.hideLoading()
    });
    that.setData({
      ordercurron: category
    })
  },

  // 查看其他分类 
  getotherOrderList:function(e){
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    let newordercategory = e.currentTarget.dataset.category
    that.setData({
      ordercurron: newordercategory,
      page:1
    })
    that.getMyorders(newordercategory, that.data.page)
  },

  // 加载下一页数据
  nextDataPage: function () {
    let that = this;
    let islastVar = that.data.isLastPage;
    let page = that.data.page;  // 获取当前页
    let neworderList = [];
    if (!that.data.isLoadInterface) {
      if (!islastVar) {
        //防止在接口未执行完再次调用接口
        that.setData({
          isLoadInterface: true
        })
        if(page < that.data.totalPage){
          page += 1  // 加载下一页
        }else{
          page = that.data.totalPage
        }
        let param = {
          "category": that.data.ordercurron,
          "pageNo": page,
          "pageSize": that.data.rows
        }
        commRequest.requestPostForm("/miniapp/order/myorders", param, (res) => {
          if(res.data.code == 200){
            neworderList = res.data.data.rows.concat(that.data.myordersList)
            that.setData({
              myordersList: neworderList,
              page: page,
              totalPage: res.data.data.totalPage,
            })
          }else{
            wx.showToast({
              title: res.data.message,
              icon:'none'
            })
          }
        })
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
  orderListshow:function(e){
    let orderSn = e.currentTarget.dataset.ordersn
    wx.navigateTo({
      url: '/pages/order/show?ordersn=' + orderSn,
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