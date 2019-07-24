import { getQuery } from '../../utils/util.js';
import getOrders from '../../apis/getOrders.js';
const placeholderUrl = 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png';

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
      menuLogoUrl: placeholderUrl,
      price: 380.88,
      amount: 1,
      deliveryFee: 10
    }, {
      time: '2019-6-17  12:00:12',
      status: 2,
      name: '喜燕周年装',
      menuLogoUrl: placeholderUrl,
      price: 380.88,
      amount: 1,
      deliveryFee: 10
    }, {
      time: '2019-6-17  12:00:12',
      status: 3,
      name: '喜燕周年装',
      menuLogoUrl: placeholderUrl,
      price: 380.88,
      amount: 1,
      deliveryFee: 10
    }]
  },
  onLoad: function () {
    const { id = '0' } = getQuery();
    this.setData({
      selectedTabId: id
    });

    // getOrders(id).then((result)=>{
    //   const { items = [] } = result;
    //   this.setData({
    //     orders: items
    //   })
    // });
  },
  tabClick($event){
    const { item = {} } = $event.currentTarget.dataset;
    const { id } = item;
    this.setData({
      selectedTabId: id
    })
  },
  cancelOrder(){

  },
  goPay(){

  }
})
