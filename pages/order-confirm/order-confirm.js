import computedBehavior from 'miniprogram-computed';
import { getQuery } from '../../utils/util';

// import getOrderConfirm from '../../apis/getOrderConfirm';
import getOrderConfirm from "../../mock/getOrderConfirm";

// import submitOrder from '../../apis/submitOrder';
import submitOrder from "../../mock/submitOrder";

import { placeholderUrl } from '../../utils/util';
import qs from "qs";




const { patchPage } = getApp().deps;
console.log('l:',  patchPage);

Page({
  behaviors: [computedBehavior],
  data: {
    address: {},
    deliveryWays: [],
    good: {},
    payWays: [],
    other: '',
    iconAddressUrl: placeholderUrl,
    arrowRightUrl: placeholderUrl,
    deliveryWayId: 1,
    amount: 1,
    payId: '',
  },
  computed: {
    deliveryWayName() {
      const { name } = this.data.payWays.find((item)=>{
      return item.id === this.data.deliveryWayId
      }) || {};

      console.log('name:', name);
      return name;
      // return 'xx'
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
  },
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
    console.log('test:');
    this.setData({
      amount: this.data.amount + 1
    });
  },
  countDelete(){
    if (this.data.amount === 1){
      return;
    }

    this.setData({
      amount: this.data.amount - 1
    });
  },
  deliveryWayChange(data){
    console.log(data);
  },
  payWayChange($event){
    const { id } = $event.currentTarget.dataset;

    this.setData({
      payId: id
    })

  }
})
