import { staticPrefix } from '../../config/index'
import { getQuery, OrderStatus, goPay, goBuy, confirmSign } from '../../utils/util';
import getOrderDetail from "../../apis/order/getOrderDetail";

Page({
  data: {
    OrderStatus: OrderStatus,
    order: {},
    waitPayIconUrl: `${staticPrefix}/waitpay_detail.png`,
    deliveryingDetailIconUrl: `${staticPrefix}/deliverying_detail.png`,
    singedDetailIconUrl: `${staticPrefix}/singed_detail.png`
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
  goBuy,
  confirmSign($event){
    confirmSign($event, ()=>{
      this.setData({
        order: Object.assign({}, this.data.order, {
          status: OrderStatus['received']
        })
      });
    });
  }
})
