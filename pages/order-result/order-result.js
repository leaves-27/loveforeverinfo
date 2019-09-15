import { getQuery, placeholderUrl } from '../../utils/util.js';
import getOrderDetail from "../../apis/order/getOrderDetail";
import { staticPrifix } from '../../config/index'

Page({
  data: {
    waitPayIconUrl: `${staticPrifix}/icon--wait-pay.png`,
    statusId: '',
    good: {
      name: '喜燕周年装',
      menuLogoUrl: placeholderUrl,
      price: 380.88,
    },
    order: {
      status: '1',
      orderCode: '',
      createTime: '',
      payTime: '',
      successTime: '',
      desc: '20分钟后自动关闭',
      deliveryId: 1,
      deliveryFee: 1,
      count: 1,
      amount: 111,
      other: ''
    },
  },
  onLoad: function () {
    const { orderId = '0' } = getQuery();
    this.setData({
      status:
    });

    getOrderDetail(orderId).then((result)=>{
      const { code, data = [], message } = result;
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }

      this.setData({
        good: data
      })
    })
  },
})
