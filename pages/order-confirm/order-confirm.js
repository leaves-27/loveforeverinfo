import computedBehavior from 'miniprogram-computed';
import qs from "qs";
import { getQuery, OrderStatus  } from '../../utils/util';
import router from "../../router";
import { staticPrefix } from '../../config/index'
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
      address: ''
    },
    deliveryWays: [],
    payWays: [],
    iconAddressUrl: `${staticPrefix}/address_selected.png`,
    arrowRightUrl: `${staticPrefix}/arrow_right.png`,
    memo: '', // 备注
    deliveryId: 1,
    amount: 1,
    payId: '0',
    isOrdering: false,
    isOrdered: false
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
    const { id, type } = this.data.address;
    const query = {
      addressId: id,
      type
    };
    router.navigateTo({
      url: `/pages/points-addresses/address?${qs.stringify(query)}`
    })
  },
  onShow(){
    const newAddress  = this.data.newAddress;
    if (newAddress){
      this.setData({
        address: newAddress,
      });
    }
  },
  inputChange(event){
    const { value } = event.detail;
    this.setData({
      memo: value
    })
  },
  submitOrder(){// 活动id、商品id

    if (!this.data.payId){
      wx.showToast({
        title: '请先选择支付方式',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const { id } = this.data.address;

    if (!id){
      wx.showToast({
        title: '请先选择收货地址',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (this.data.isOrdering){
      return;
    }

    if (this.data.isOrdered){
      wx.showToast({
        title: '你已经下单, 请勿重新下单',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    this.setData({
      isOrdering: true
    });
    const { featureId = '', id: goodId, inviteCode = '' } = getQuery();

    // 提交订单成功后
    submitOrder({
      goodId,
      deliveryWayId: this.data.deliveryId,
      payWayId: this.data.payId,
      receiveAddressId: id,
      featureId,
      count: this.data.amount,
      memo: this.data.memo,
      inviteCode
    }).then((result)=>{
      // 校验信息正确，然后调出支付进行支付，支付完成后跳转到支付结果页
      const { code, data = {}, message } = result;
      if (code * 1 !== 1) {
        throw new Error('下单失败, 请稍后重新下单或联系客服');
      }
      this.setData({
        isOrdered: true,
        isOrdering: false
      });
      const {
        orderId,
        timeStamp,
        nonceStr,
        packageStr,
        paySign,
        signType
      } =  data;

      if(this.data.payId === '1'){
      	wx.showToast({
		      title: '下单已成功，客服会尽快和你联系',
		      icon: 'none',
		      duration: 2000
	      });
      } else {
        pay({
          orderId,
          timeStamp,
          nonceStr,
          packageStr,
          paySign,
          signType,
        }).then((res)=>{
          const { code, data, message } = res;
          if (code * 1 !== 1){
            throw new Error('支付失败, 请稍后重新支付或联系客服');
          }
          const { orderId } = data;
          const query = {
            orderId
          };
          router.redirectTo({
            url: `/pages/order-result/order-result?$${qs.stringify(query)}`
          });
        }).catch(({ errMsg = '' })=>{
          this.setData({
            isOrdering: false
          });

          if(errMsg !== "requestPayment:fail cancel") { // 不是支付取消
            const query = {
              orderId
            };
            router.redirectTo({
              url: `/pages/order-result/order-result?$${qs.stringify(query)}`
            });
          } else {
            const query = {
              id: OrderStatus['all']
            };
            router.navigateTo({
              url: `/pages/my-order/my-order?$${qs.stringify(query)}`
            });
          }
        });
      }
    })
    .catch((error)=>{
      this.setData({
        isOrdering: false
      });
      wx.showToast({
        title: '下单或支付失败',
        icon: 'none',
        duration: 2000
      })
    });
  },
  countAdd(){
    this.setData({
      amount: this.data.amount * 1 + 1
    });
  },
  countDelete(){
    if (this.data.amount === 1){
      return;
    }
    this.setData({
      amount: this.data.amount * 1 - 1
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
    const { suites = [] } = data;
    const { featureId = '' } = getQuery();

    const suite = suites.find((item)=>{
      return item.featureId === featureId;
    });

    this.setData({
      good: suite
    });
  },
  setAddresses(result = {}){
    const { code, data, message } = result;
    if (code * 1  !== 1) {
      throw new Error(message || '请求错误');
    }
    const {
      id = '',
      name = '',
      address = '',
      type = ''
    } = data;

    this.setData({
      address: {
        id,
        name,
        address,
        type
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
    const { id = '0' } = getQuery();

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
  onUnload(){
    this.setData({
      isOrdered: false
    });
  }
})
