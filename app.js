//app.js
App({
  globalData: {
    host: 'https://mini-api.zhikexia0633.com',
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    platform:'xcx',
    code:null,
    token:'d537d56892db37e2d74c333412657d52'
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code
        console.log(this.globalData.code)
        // wx.request({
        //   url: this.globalData.host + '/miniapp/login/wxlogin', 
        //   method: "post",
        //   data: {"platform": this.globalData.platform, "wxcode": this.globalData.code},
        //   header: { 'content-type': 'application/x-www-form-urlencoded'},
        //   success(res) {
        //     console.log(res.data)
        //   }
        // })
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