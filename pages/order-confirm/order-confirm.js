import computedBehavior from 'miniprogram-computed';
import qs from "qs";
import { getQuery, getCurrentRoute } from '../../utils/util';
import { staticPrifix } from '../../config/index'

// import getOrderConfirm from '../../apis/getOrderConfirm';
// import getOrderConfirm from "../../apis/order/getOrderConfirm";
// import submitOrder from '../../apis/submitOrder';
import getGoodDetail from '../../apis/good/getGoodDetail';
import getUserDefaultAddress from '../../apis/address/getUserDefaultAddress';
import getDeliveryWays from '../../apis/getDeliveryWays';
import getPayWays from '../../apis/getPayWays';
import submitOrder from "../../apis/order/submitOrder";
import pay from "../../apis/order/pay";

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
    payWays: [],
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
      url: `../points-addresses/address?$${qs.stringify(query)}`
    })
  },
  submitOrder(){
    if (!this.data.payId){
      wx.showToast({
        title: '请先选择支付方式',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    // 提交订单成功后
    submitOrder({
      goodId: this.data.good.id,
      deliveryWayId: this.data.deliveryId,
      payWayId: this.data.payId,
      receiveAddressId: this.data.address.id,
      count: this.data.amount,
      memo: this.data.other
    }).then((result)=>{
      // 校验信息正确，然后调出支付进行支付，支付完成后跳转到支付结果页
      const { code, data = {}, message } = result;
      if (code * 1 !== 1) {
        throw new Error('下单失败, 请稍后重新下单或联系客服');
      }
      const {
        orderId,
        goodId,
        deliveryWayId,
        payWayId,
        receiveAddressId,
        count,
        memo
      } =  data;

      return pay({
        orderId,
        goodId,
        deliveryWayId,
        payWayId,
        receiveAddressId,
        count,
        memo
      });
    })
    .then((res)=>{
      const { code, data, message } = res;
      if (code * 1 !== 1){
        throw new Error('支付失败, 请稍后重新支付或联系客服');
      }
      const { orderId } = data;
      const query = {
        orderId
      };
      router.navigateTo({
        url: `/pages/order-result/order-result?$${qs.stringify(query)}`
      })
    })
    .catch((error)=>{
      console.log('===error:', error);
      const { message = '下单或支付失败, 请检查网络重新下单或支付；或者联系客服' } = error;

      wx.showToast({
        title: message,
        icon: 'none',
        duration: 2000
      });
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
    console.log('$event:', $event);
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
  setGood(result = {}){
    const { code, data, message } = result;
    if (code * 1  !== 1) {
      throw new Error(message || '请求错误');
    }
    this.setData({
      good: data
    });
  },
  setAddresses(result = {}){
    const { code, data, message } = result;
    if (code * 1  !== 1) {
      throw new Error(message || '请求错误');
    }
    const { id = '', name = '', desc = ''} = data;
    this.setData({
      address: {
        id,
        name,
        desc
      }
    });
  },
  setDeliveryWay(result = {}){
    const { code, data, message } = result;
    if (code * 1 !== 1) {
      throw new Error(message || '请求错误');
    }
    this.setData({
      deliveryWays: data
    });
  },
  setPayWay(result = {}){
    const { code, data, message } = result;
    if (code  * 1 !== 1) {
      throw new Error(message || '请求错误');
    }
    this.setData({
      payWays: data
    });
  },
  onLoad: function () {
    const { id = '0', count } = getQuery();
    this.setData({
      amount: count
    });

    Promise.all([
      getGoodDetail(id),
      getUserDefaultAddress(),
      getDeliveryWays(),
      getPayWays()
    ]).then((result = [])=>{
      this.setGood(result[0]);
      this.setAddresses(result[1]);
      this.setDeliveryWay(result[2]);
      this.setPayWay(result[3]);
    });
  },
})
