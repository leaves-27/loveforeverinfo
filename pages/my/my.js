//index.js
//获取应用实例
const app = getApp()

const placeholderUrl = 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png';

Page({
  data: {
    score: 200000,
    orderStatus: [{
      id: '001',
      name: '待付款',
      iconUrl: placeholderUrl
    }, {
      id: '002',
      name: '配送中',
      iconUrl: placeholderUrl
    }, {
      id: '003',
      name: '已签收',
      iconUrl: placeholderUrl
    }, {
      id: '004',
      name: '全部',
      iconUrl: placeholderUrl
    }],
    name: '疯趣的二师兄',
    phone: '135****8888',
    qrUrl: placeholderUrl,
    logoUrl: placeholderUrl,
    addressIconUrl: placeholderUrl
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  }
})
