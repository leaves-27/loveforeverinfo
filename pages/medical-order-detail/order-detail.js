import { staticPrifix } from '../../config/index'
import { goPay, getQuery } from '../../utils/util';

// import getOrderDetail from '../../apis/getOrderDetail.js';
import getOrderDetail from "../../mock/order/getOrderDetail";

Page({
  data: {
    order: {},
    waitPayIconUrl: `${staticPrifix}/waitpay_detail.png`,
    deliveryingDetailIconUrl: `${staticPrifix}/deliverying_detail.png`,
    singedDetailIconUrl: `${staticPrifix}/singed_detail.png`
  },
  onLoad: function () {
    const { id = '' } = getQuery();
    this.setData({
      id: id,
    });

    getOrderDetail(id).then((result)=>{
      const { code, data = null, message } = result;
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }
      this.setData({
        order: data,
      })
    })
  },
  goPay,
  goBuy(){},
  goDeliveryDetail(){}
})
