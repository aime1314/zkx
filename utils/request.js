//发送请求
const app = getApp();
const requestPost = (url, data, success) => {
  wx.request({
    url: app.globalData.host + url,
    data: data,
    method: "post",
    header: { "xcx-requested-login-token": wx.getStorageSync('Token')},
    success: (res) => {
      success(res)
    },
    fail: function (res) {
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        duration: 2000
      })
    },
    complete: function (res) { },
  })
}

const requestPostForm = (url, data, success) => {
  wx.request({
    url: app.globalData.host + url,
    data: data,
    method: "post",
    header: { "content-type": "application/x-www-form-urlencoded", "xcx-requested-login-token": wx.getStorageSync('Token')},
    success: (res) => {
      success(res)
    },
    fail: function (res) {
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        duration: 2000
      })
    },
    complete: function (res) { },
  })
}
module.exports = {
  requestPost: requestPost,
  requestPostForm: requestPostForm
}
