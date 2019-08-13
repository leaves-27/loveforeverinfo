import { staticPrifix } from '../../config/index'
import { goPay, getQuery } from '../../utils/util';

// import getOrderDetail from '../../apis/getOrderDetail.js';
import getOrderDetail from "../../mock/getOrderDetail";

Page({
  data: {
    order: {},
    waitPayIconUrl: `${staticPrifix}/icon--wait-pay.png`,
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
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const { user = {}, good = {}, order = {} } = data;
      this.setData({
        order: {
          ...order,
          user,
          good
        },
      })
    })
  },
  methods: {
    goPay,
    goBuy(){},
    goDeliveryDetail(){}
  }
})
