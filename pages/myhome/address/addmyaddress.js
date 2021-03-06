// pages/myhome/addmyaddress.js
const commRequest = require('../../../utils/request.js');
const commonFun = require('../../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toptitle: '',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: 'icon_back',
    contact: '', //联系人
    contactNumber: '',//联系电话
    region: ['省/市/区', ' ', ' '],  //默认地
    customItem: ' ',
    wxCode:'',//小程序 code
    addressMsg: {},
    province: '', //省
    city: '', //市
    area: '',//区
    address: '',  //详细地址
    addressid:'', //地址ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      addressid:options.addressid ? options.addressid : '',
      contactNumber: app.globalData.usermsg.phone ? app.globalData.usermsg.phone : '',
      contact:options.contact ? decodeURIComponent(options.contact):'',
      address:options.address ? decodeURIComponent(options.address):'',
      region:options.province ? [decodeURIComponent(options.province)+'-',decodeURIComponent(options.city)+'-',decodeURIComponent(options.area)]: ['省/市/区', ' ', ' ']
    })
    if(options.contact && options.address && options.province){
      that.setData({
        toptitle:'修改地址'
      })
    }else{
      that.setData({
        toptitle:'新建地址'
      })
    }
    // if (options.addressid && options.defaultid){
    //   that.geteditmyaddress(options.addressid, options.defaultid)
    // }
    wx.login({
      success: res => {
        console.log(res.code)
        that.setData({
          wxCode:res.code
        })
        
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


  //获取电话
  getPhoneNumber(e) {
    var that = this;
    console.log(app.globalData.userInfo)
    console.log(e.detail);
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      //授权拿到手机号后要做解密处理
      let usermsg = {
        // encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        avatarUrl: app.globalData.userInfo?app.globalData.userInfo.avatarUrl:'',
        nickName: app.globalData.userInfo?app.globalData.userInfo.nickName:'',
        phone: e.detail.encryptedData,
        wxCode: that.data.wxCode,
      }
      commRequest.requestPostForm("/miniapp/user/updateUserInfo", usermsg, (res) => {
        if (res.data.code == 200) {
          that.setData({
            contactNumber: res.data.data.phone
          })
          console.log(that.data.contactNumber)
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      });
    }
  },

  //收货人
  bindcontactInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  //电话
  bindNumberInput: function (e) {
    this.setData({
      contactNumber: e.detail.value
    })
  },

  //省市区
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  //详细地址
  bindaddressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  //添加、修改地址
  getaddmyaddress: function () {
    let that = this
    let addressRequest = {}
    if(that.data.toptitle == '修改地址'){
      addressRequest = {
        "addressId":that.data.addressid,
        "contact": that.data.contact,
        "contactNumber": that.data.contactNumber,
        "province": that.data.region[0],
        "city": that.data.region[1],
        "area": that.data.region[2],
        "address": that.data.region[0]+that.data.region[1]+that.data.region[2]+that.data.address,
      }
    }else{
      addressRequest = {
        "contact": that.data.contact,
        "contactNumber": that.data.contactNumber,
        "province": that.data.region[0],
        "city": that.data.region[1],
        "area": that.data.region[2],
        "address": that.data.region[0]+that.data.region[1]+that.data.region[2]+that.data.address,
      }
    }
    if(addressRequest.province &&　addressRequest.province != '省/市/区' && that.data.region[0] && that.data.region[1] && that.data.region[2] && that.data.contact && that.data.contactNumber && that.data.contactNumber.length == 11 &&　that.data.address &&　that.data.address != '省/市/区'){
      commRequest.requestPost("/miniapp/address/save", JSON.stringify(addressRequest), (res) => {
        if (res.data.data) {
          wx.navigateTo({
            url: '/pages/myhome/address/add',
          })
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      });
    }else{
      wx.showToast({
        title: '您填写的信息有误，请重新填写',
        icon:'none'
      })
    }
    
  },

  //编辑地址
  // geteditmyaddress: function (id,defaultid) {
  //   let that = this
  //   that.setData({
  //     region:1111
  //   })
  //   let addressRequest = {
  //     "contact": that.data.contact,
  //     "contactNumber": that.data.contactNumber,
  //     "province": that.data.region[0],
  //     "city": that.data.region[1],
  //     "area": that.data.region[2],
  //     "address": that.data.address,
  //     "addressId": id,
  //     "isdefault": defaultid,
  //   }
  //   commRequest.requestPost("/miniapp/address/save", JSON.stringify(addressRequest), (res) => {
  //     if (res.data.data) {
  //       wx.navigateTo({
  //         url: '/pages/myhome/address/add',
  //       })
  //     } else {
  //       wx.showToast({
  //         title: res.data.message,
  //       })
  //     }
  //   });
  // },

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