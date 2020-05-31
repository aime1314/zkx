// pages/myhome/shop/joinus.js
const commRequest = require('../../../utils/request.js');
const commonFun = require('../../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toptitle: '加盟我们',
    topbackflage: false,
    topclassName: 'title_index',
    topiconurl: 'icon_back',
    addusType:1,  //1:回收员  0：加盟商
    applicant:null,  //姓名
    contactNumber:null,  //联系电话
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  //加入我们
  addusFun:function(){
    let that = this
    let parm = {
      applicant: that.data.applicant,
      applyType: that.data.addusType,
      contactNumber: that.data.contactNumber,
    }
    if (that.data.applicant && that.data.addusType && that.data.contactNumber){
      commRequest.requestPostForm("/miniapp/personal/joinUs", parm, (res) => {
        if (res.data.code == 200) {
          wx.showToast({
            title: '加入成功',
          })
        } else {
          wx.showToast({
            title: '加入失败',
            icon: 'none'
          })
        }
      });
    }else{
      wx.showToast({
        title: '请正确输入加入信息',
        icon:'none'
      })
    }
    
  },

  //选择加盟类型
  getaddtype:function(e){
    let that = this
    let type = e.currentTarget.dataset.addtype;
    that.setData({
      addusType: type
    })
  },

  //联系人
  bindcontactInput: function (e) {
    this.setData({
      applicant: e.detail.value
    })
  },

  //电话
  bindNumberInput: function (e) {
    this.setData({
      contactNumber: e.detail.value
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