const app = getApp();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const getUserInfo = data => {
  console.log(data)
  debugger
  app.globalData.userInfo = data.detail.userInfo
  this.setData({
    userInfo: data.detail.userInfo,
    hasUserInfo: true
  })
  }


module.exports = {
  formatTime: formatTime,
  getUserInfo: getUserInfo,
}
