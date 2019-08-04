// import { getQuery } from '../../utils/util.js';
// import getOrders from '../../apis/getOrders.js';
// import getOrders from "../../mock/getOrders";
import { placeholderUrl } from '../../utils/util';

Page({
  data: {
    consigneeAdressDesc: '杭州市西湖区蒋村花园晴川街街道西溪花园红柿苑xxx号',
    iconAddressUrl: placeholderUrl,
    arrowRightUrl: placeholderUrl,
    deliveryWays: [{
      id: 1,
      name: '快递配送'
    }, {
      id: 2,
      name: 'xxx'
    }],
    good: {
      name: '喜燕周年装',
      menuLogoUrl: placeholderUrl,
      price: 380.88,
      amount: 1,
      deliveryFee: 10
    },
    deliveryWay: 1,
    other: 'testdafadfas',
    payWays: [{
      id: '1',
      iconUrl: placeholderUrl,
      name: '微信支付'
    }, {
      id: '2',
      iconUrl: placeholderUrl,
      name: '线下支付'
    }],
  },
  methods: {
    submitOrder(){

    },
    countAdd(){

    },
    countDelete(){

    },
    deliveryWayChange(){

    },
  },
  onLoad: function () {
    // const { id = '0' } = getQuery();
    // this.setData({
    //   selectedTabId: id
    // });
    //
    // getOrders().then((result)=>{
    //   const { code, data = [], message } = result;
    //   if (code !== 1) {
    //     throw new Error(message || '请求错误');
    //   }
    //
    //   this.setData({
    //     orders: data
    //   })
    // })
  },
})
