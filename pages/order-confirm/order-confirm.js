import { getQuery } from '../../utils/util';

// import getOrderConfirm from '../../apis/getOrderConfirm';
import getOrderConfirm from "../../mock/getOrderConfirm";

// import submitOrder from '../../apis/submitOrder';
import submitOrder from "../../mock/submitOrder";

import { placeholderUrl } from '../../utils/util';

Page({
  data: {
    address: {},
    deliveryWays: [],
    good: {},
    payWays: [],
    other: '',
    iconAddressUrl: placeholderUrl,
    arrowRightUrl: placeholderUrl,
    deliveryWay: 1
  },
  methods: {
    submitOrder(){
      console.log('======1111111111111');
      // 提交订单成功后
      // submitOrder({
      //   adress: {
      //     id: '',
      //     desc: ''
      //   },
      //   goodId: '',
      //   count: '',
      //   deliveryWayId: '',
      //   desc: '',
      //   payWayId: ''
      // }).then((result)=>{
      //   console.log('================');
      //   // 校验信息正确，然后调出支付进行支付，支付完成后跳转到支付结果页
      //   const { code, data = [], message } = result;
      //   if (code !== 1) {
      //     throw new Error(message || '请求错误');
      //   }
      //
      //   const { id = '0' } = getQuery();
      //   const query = {
      //     id
      //   };
      //   wx.navigateTo({
      //     url: `../order-result/order-result?$${qs.stringify(query)}`
      //   })
      // }).catch(()=>{
      //
      // });
    },
    countAdd(){

    },
    countDelete(){

    },
    deliveryWayChange(){

    }
  },
  onLoad: function () {
    const { id = '0' } = getQuery();
    getOrderConfirm(id).then((result)=>{
      const { code, data = [], message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const { address, deliveryWays, good, payWays, other} = data;
      this.setData({ address, deliveryWays, good, payWays, other});
    })
  }
})
