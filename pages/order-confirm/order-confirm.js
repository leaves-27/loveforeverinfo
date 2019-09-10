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
      adressId: this.data.address.id,
      goodId: this.data.good.id,
      amount: this.data.amount,
      deliveryId: this.deliveryId,
      desc: this.data.other,
      payId: this.data.payId
    }).then((result)=>{
      // 校验信息正确，然后调出支付进行支付，支付完成后跳转到支付结果页
      const { code, data = [], message } = result;
      if (code * 1 !== 1) {
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


      // this.setAddresses(result[0]);
      // this.setDeliveryWay(result[1]);
      // this.setPayWay(result[2]);
    });
  },
})
