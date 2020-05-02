//app.js
App({
  globalData: {
    host: 'https://mini-api.zhikexia0633.com',
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    platform:'xcx',
    code:null,
    category: -1,   //解决switchTab不支持传参 -1全部；0待回收；1已回收；2已取消；3待评价；4已评价
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log(this.globalData.category)
    // 登录
    wx.login({
      success: res => {
        let that = this
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.globalData.code = res.code
        let newcode = res.code;
        console.log(wx.getStorageSync('Token'))
        wx.request({
          url: that.globalData.host + '/miniapp/login/heartbeat',
          method: "post",
          header: { 'content-type': 'application/x-www-form-urlencoded', 'xcx-requested-login-token': wx.getStorageSync("Token") ? wx.getStorageSync("Token"):''},
          success(res) {
            if(res.data.code != 200){
              wx.request({
                url: that.globalData.host + '/miniapp/login/wxlogin',
                method: "post",
                data: { 'platform': 'xcx', 'wxcode': newcode},
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success(res) {
                  wx.setStorageSync('Token', res.data.data.loginToken)
                }
              })
            }
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { //已授权
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //检验是否已过期
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
      }
    })
  },
})