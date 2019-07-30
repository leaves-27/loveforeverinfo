// import { getQuery } from '../../utils/util.js';
// import getOrders from '../../apis/getOrders.js';
// import getOrders from "../../mock/getOrders";
import { placeholderUrl } from '../../utils/util';

Page({
  data: {
    waitPayIconUrl: placeholderUrl,
    user: {
      name: '疯趣的二师兄',
      phone: '135****8888',
      userLogoUrl: placeholderUrl,
      addressIconUrl: placeholderUrl,
      address: '浙江杭州市江干区明月桥路38号'
    },
    good: {
      name: '喜燕周年装',
      menuLogoUrl: placeholderUrl,
      price: 380.88,
      amount: 1,
      deliveryFee: 10
    },
    order: {
      status: '1',
      orderCode: '',
      createTime: '',
      payTime: '',
      successTime: '',
      desc: '20分钟后自动关闭'
    }
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
