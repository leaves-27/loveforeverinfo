//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    tabs: [{
      id: "0",
      name: "全部"
    }, {
      id: "1",
      name: "待付款"
    }, {
      id: "2",
      name: "配送中"
    }, {
      id: "3",
      name: "已签收"
    }],
    selectedTabId: "",
    orders: [{
      time: '2019-6-17  12:00:12',
      status: 1,
      name: '喜燕周年装',
      menuLogoUrl: '',
      price: 380.88,
      amount: 1,
      deliveryFee: 10
    }, {
      time: '2019-6-17  12:00:12',
      status: 2,
      name: '喜燕周年装',
      menuLogoUrl: '',
      price: 380.88,
      amount: 1,
      deliveryFee: 10
    }, {
      time: '2019-6-17  12:00:12',
      status: 3,
      name: '喜燕周年装',
      menuLogoUrl: '',
      price: 380.88,
      amount: 1,
      deliveryFee: 10
    }]
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  tabClick(){

  }
})
