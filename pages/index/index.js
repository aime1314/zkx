//index.js
//获取应用实例
const commRequest = require('../../utils/request.js');
const commonFun = require('../../utils/util.js');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp()
Page({
  data: {
    toptitle: '纸壳侠',
    topbackflage:false,
    topclassName:'title_index',
    topiconurl:'icon_home',
    imgUrls: [], //banner图
    rollData: [], //通知公告
    indexTypes: [], //回收类型
    indicatorDots: true, //banner图设置
    vertical: false, //
    autoplay: true, //
    circular: false, //
    interval: 2000, //
    duration: 500, //
    previousMargin: 0, //
    nextMargin: 0, //
    address:null, //地址
    area:null, //区
    city:null, //市
    province:null, //省
    faceCode:null,  //面对面二微码
    faceFlag:false,  //是否显示面对面
    latitude: '', //用户经纬度
    longitude: '',  //用户经纬度
    address:null, //用户详细地址
    userInfo: {}, //用户信息
    hasUserInfo: app.globalData.hasUserInfo, //是否已授权
    canIUse: app.globalData.canIUse, //授权按钮
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
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
              that.getUserLocation()
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

    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapkey  
    })
    
  },
  onShow:function(){
    let that = this
    that.getNotice()
    that.getAdvBanner()
    that.gettTypes()
  },
  again_getLocation:function(){
    let that = this;
    // 获取位置信息
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
            success: function (res) {
              console.log(res)
              if (res.cancel) {
                wx.showToast({
                  title: '授权失败',
                  icon: 'success',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    console.log(dataAu)
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用getLocationt的API
                      that.getUserLocation(that);
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
          that.getUserLocation(that);
        }
        else { //授权后默认加载
          that.getUserLocation(that);
        }
      }
    })

  },

  //用户定位
  getUserLocation:function(){
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        app.globalData.latitude = latitude
        app.globalData.longitude = longitude
        qqmapsdk.reverseGeocoder({
          location: '',
          success: function (res) {
            app.globalData.area = res.result.address_component.district
            app.globalData.city = res.result.address_component.city
            app.globalData.province = res.result.address_component.province
            app.globalData.address = res.result.address
          }

        })
        
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
      this.getUserLocation()
      let usermsg = {
        avatarUrl: app.globalData.userInfo?app.globalData.userInfo.avatarUrl:'',
        nickName: app.globalData.userInfo?app.globalData.userInfo.nickName:'',
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
    }else{
      this.setData({
        hasUserInfo: 0
      })
    }
  },



  toBuy: function (e) {
    let recoveryclassid = e.currentTarget.dataset.recoveryclassid
    let currontypeindex = e.currentTarget.dataset.currontypeindex
    if(!app.globalData.address && !app.globalData.province && !app.globalData.city && !app.globalData.area){
      // wx.showToast({
      //   title: '纸壳侠回收需要获取你的地址位置，请关闭微信重新授权',
      //   icon:'none',
      //   duration: 4000
      // })
      this.again_getLocation()
    }else{
      wx.navigateTo({
        url: '/pages/buy/index?recoveryclassid=' + recoveryclassid + '&currontypeindex=' + currontypeindex,
      })
    }
  },
  othersite:function(){
    if(!app.globalData.address && !app.globalData.province && !app.globalData.city && !app.globalData.area){
      // wx.showToast({
      //   title: '纸壳侠回收需要获取你的地址位置，请关闭微信重新授权',
      //   icon:'none',
      //   duration: 4000
      // })
      this.again_getLocation()
    }else{
      wx.navigateTo({
        url: '/pages/other/other',
      })
    }
    
  },

  //通知信息
  getNotice:function(){
    let that = this;
    commRequest.requestPost("/miniapp/index/notice", {}, (res) => {
      that.setData({
        rollData: res.data.data
      })
    });
  },

  //banner图
  getAdvBanner: function () {
    let that = this;
    commRequest.requestPost("/miniapp/index/advbanner", {}, (res) => {
      that.setData({
        imgUrls: res.data.data
      })
    });
  },

  //回收分类
  gettTypes:function(){
    let that = this;
    commRequest.requestPost("/miniapp/index/types", {}, (res) => {
      that.setData({
        indexTypes: res.data.data
      })
      wx.hideLoading()
    });
  },

  //面对面收货
  getfaceshow:function(){
    let that = this
    let uservist = {
      // latitude: app.globalData.latitude,
      // longitude: app.globalData.longitude,
      area:app.globalData.area,
      city:app.globalData.city,
      province:app.globalData.province,
      address:app.globalData.address,
    }
    console.log(uservist)
    if(!app.globalData.address && !app.globalData.province && !app.globalData.city && !app.globalData.area){
      // wx.showToast({
      //   title: '纸壳侠回收需要获取你的地址位置，请重新授权',
      //   icon:'none',
      //   duration: 4000
      // })
      that.again_getLocation()
    }else{
      commRequest.requestPostForm("/miniapp/index/openQRcode", uservist, (res) => {
        // console.log(res.data)
        if(res.data.code == 200){
          that.setData({
            faceFlag: true,
            faceCode: "data:image/png;base64," + res.data.data
          })
        }else{
          // wx.showToast({
          //   title: res.data.message,
          //   icon:'none'
          // })
          wx.showModal({
            title: '友情提示',
            content: res.data.message,
            showCancel:false,
            success (res) {
  
            }
          })
        }
        
      });
    }
    
    
  },


//关闭 
  getfaceclose:function(){
    let that = this
    that.setData({
      faceFlag:false
    })
  },
  

 //创建二微码
  createQrCode: function (content, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(content, canvasId, cavW, cavH);
    this.canvasToTempImage(canvasId);
  },

  //获取临时缓存图片路径，存入data中
  canvasToTempImage: function (canvasId) {
    let that = this;
    wx.canvasToTempFilePath({
      canvasId,   // 这里canvasId即之前创建的canvas-id
      success: function (res) {
        let tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({       // 如果采用mpvue,即 this.imagePath = tempFilePath
          faceFlag: true,
          faceCode: tempFilePath
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
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
  
})
