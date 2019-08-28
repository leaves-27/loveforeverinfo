import computedBehavior from 'miniprogram-computed';
import qs from "qs";
import { getQuery } from '../../utils/util';
import { staticPrifix } from '../../config/index'

// import getOrderConfirm from '../../apis/getOrderConfirm';
// import getOrderConfirm from "../../mock/order/getOrderConfirm";
// import submitOrder from '../../apis/submitOrder';
import getGood from '../../mock/good/getGood';
import getUserDefaultAddress from '../../mock/address/getUserDefaultAddress';
import getDeliveryWays from '../../mock/getDeliveryWays';
import getPayWays from '../../mock/getPayWays';
import submitOrder from "../../mock/order/submitOrder";

Page({
  behaviors: [computedBehavior],
  data: {
    good: {},
    address: {
      id: '',
      name: '',
      desc: ''
    },
    deliveryWays: [],
    payWays: [{
      id: '1',
      iconUrl: `${staticPrifix}/wxpay.png`,
      name: '微信支付'
    }, {
      id: '2',
      iconUrl: `${staticPrifix}/offlinepay.png`,
      name: '线下支付'
    }],
    iconAddressUrl: `${staticPrifix}/address_selected.png`,
    arrowRightUrl: `${staticPrifix}/arrow_right.png`,
    other: '', // 备注
    deliveryId: 1,
    amount: 1,
    payId: '',
  },
  computed: {
    deliveryWayName() {
      const { name } = this.data.payWays.find((item)=>{
      return item.id === this.data.deliveryWayId
      }) || {};
      return name;
    }
  },
  goAddress(){
    const query = {
      adressId: ''
    };
    wx.navigateTo({
      url: `../address/address?$${qs.stringify(query)}`
    })
  },
  submitOrder(){
    if (!this.data.payId){
      wx.showToast({
        title: '请先选择支付方式',
        icon: 'none',
        duration: 2000
      });
    }
    // 提交订单成功后
    submitOrder({
      adressId: this.data.address.id,
      goodId: this.data.good.id,
      amount: this.data.amount,
      deliveryId: this.deliveryId,
      desc: this.data.other,
      payId: this.data.payId
    }).then((result)=>{
      // 校验信息正确，然后调出支付进行支付，支付完成后跳转到支付结果页
      const { code, data = [], message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }

      const { id = '0' } = getQuery();
      const query = {
        statusId: ''
      };
      wx.navigateTo({
        url: `../order-result/order-result?$${qs.stringify(query)}`
      })
    }).catch(()=>{

    });
  },
  countAdd(){
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
  deliveryWayChange($event){
    const { deliveryId } = $event.detail;
    this.setData({
      deliveryId
    })
  },
  payWayChange($event){
    const { id } = $event.currentTarget.dataset;
    this.setData({
      payId: id
    });
  },
  onLoad: function () {
    const { id = '0', count } = getQuery();
    this.setData({
      amount: count
    });

    Promise.all([getGood(), getUserDefaultAddress(), getDeliveryWays(), getPayWays()]).then((result)=>{

      // const { code, data, message } = result[0];
      //
      //
      // const { code, data, message } = result[1];
      //
      //
      // const { code, data, message } = result[2];
      //
      // this.setData({
      //   address,
      //   deliveryWays,
      //   payWays,
      // });
    });

    // getOrderConfirm(id).then((result)=>{
    //   const { code, data = [], message } = result;
    //   if (code !== 1) {
    //     throw new Error(message || '请求错误');
    //   }
    //   const { address = {}, deliveryWays = [], good = {}, payWays = [], other = ''} = data;
    //   console.log('count:', count);
    //   this.setData({
    //     address,
    //     deliveryWays,
    //     good,
    //     other
    //   });
    // })
  },
})
