// import getUserInfo from '../../apis/getUserInfo';
// import getOrders from '../../apis/getOrders';
import getUserInfo from '../../mock/user/getUserInfo';
import getOrders from "../../mock/order/getOrders";

Page({
  data: {
    name: '',
    phone: '',
    userLogoUrl: '',
    tabs: [{
      id: '01',
      name: '销售概况'
    }, {
      id: '02',
      name: '消费者信息'
    }],
    orders: [],
    selectedTabId: '01'
  },
  bindPhone(){
    wx.navigateTo({
      url: `../bind-phone/bind-phone`
    });
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
