import qs from 'qs';
import { getOrderStatus } from '../../utils/util';
import { staticPrifix } from '../../config/index'

// import getUserInfo from '../../apis/getUserInfo';
import getUserInfo from '../../mock/getUserInfo';
import getOrders from "../../mock/getOrders";

Page({
  data: {
    name: '',
    phone: '',
    userLogoUrl: '',
    orders: [],
    tabs: [{
      id: '01',
      name: '销售概况'
    }, {
      id: '02',
      name: '消费者信息'
    }],
    selectedTabId: '01'
  },
  goMyOrder($event){
    const { item } = $event.currentTarget.dataset;
    const { id } = item;

    const query = {
      id
    };
    wx.navigateTo({
      url: `../my-order/my-order?$${qs.stringify(query)}`
    })
  },
  tabChange($event){
    const { item = {} } = $event.currentTarget.dataset;
    const { id } = item;
    this.setData({
      selectedTabId: id
    })
  },
  onLoad(){
    Promise.all([getUserInfo(), getOrders()]).then((result)=>{
      const { code, data, message } = result[0] || {};
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const {
        name,
        phone,
        score,
        userLogoUrl,
      } = data;

      const { code: orderCode, data: orderData, message: orderMessage } = result[1] || {};
      console.log('result:', result);
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }

      if (orderCode !== 1) {
        throw new Error(orderMessage || '请求错误');
      }

      this.setData({
        name,
        phone,
        score,
        userLogoUrl,
        orders: orderData
      })
    })
  },
})
