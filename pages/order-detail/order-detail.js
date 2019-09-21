import { staticPrifix } from '../../config/index'
import { goPay, getQuery, OrderStatus } from '../../utils/util';

// import getOrderDetail from '../../apis/getOrderDetail.js';
import getOrderDetail from "../../apis/order/getOrderDetail";

Page({
  data: {
    OrderStatus: OrderStatus,
    order: {},
    waitPayIconUrl: `${staticPrifix}/waitpay_detail.png`,
    deliveryingDetailIconUrl: `${staticPrifix}/deliverying_detail.png`,
    singedDetailIconUrl: `${staticPrifix}/singed_detail.png`
  },
  onLoad: function () {
    const { id = '0' } = getQuery();
    this.setData({
      id: id,
    });

    getOrderDetail(id).then((result)=>{
      const { code, data = [], message } = result;
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }
      this.setData({
        order: data
      })
    })
  },
  goPay,
  goBuy(){

  },
  goDeliveryDetail(){

  },
  goSign(){

  }
})
