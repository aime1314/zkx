Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#f60",
    list: [
      {
        "text": "首页",
        "iconPath": "/images/iconTab/icon_WriteOff.png",
        "selectedIconPath": "/images/iconTab/icon_WriteOff_HL.png",
        "pagePath": "/pages/index/index"
      },
      {
        "text": "订单",
        "iconPath": "/images/iconTab/icon_Receipt.png",
        "selectedIconPath": "/images/iconTab/icon_Receipt_HL.png",
        "pagePath": "/pages/order/index"
      },
      {
        "text": "我的",
        "iconPath": "/images/iconTab/icon_Order.png",
        "selectedIconPath": "/images/iconTab/icon_Order_HL.png",
        "pagePath": "/pages/myhome/index"
      }
      ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})