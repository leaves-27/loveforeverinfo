import qs from 'qs';

const placeholderUrl = 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png';

Page({
  data: {
    score: 200000,
    orderStatus: [{
      id: '1',
      name: '待付款',
      iconUrl: placeholderUrl
    }, {
      id: '2',
      name: '配送中',
      iconUrl: placeholderUrl
    }, {
      id: '3',
      name: '已签收',
      iconUrl: placeholderUrl
    }, {
      id: '0',
      name: '全部',
      iconUrl: placeholderUrl
    }],
    name: '疯趣的二师兄',
    phone: '135****8888',
    qrUrl: placeholderUrl,
    logoUrl: placeholderUrl,
    addressIconUrl: placeholderUrl
  },
  goMyQr() {
    wx.navigateTo({
      url: '../my-qr/my-qr'
    })
  },
  goMyOrder($event){
    const { item } = $event.currentTarget.dataset;
    const { id } = item;

    const query = {
      id
    };
    wx.navigateTo({
      url: `../my-order/my-order?$${qs.stringify(query)}`
    })
  },
  onLoad: function () {
  },
})
