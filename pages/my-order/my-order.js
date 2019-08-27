import { getQuery, getOrderStatus } from '../../utils/util.js';
// import getOrders from '../../../../apis/getOrders.js';
import getOrders from "../../mock/order/getOrders";

Page({
  data: {
    tabs: getOrderStatus(),
    selectedTabId: "",
    orders: []
  },
  onLoad: function () {
    const { id = '' } = getQuery();
    this.setData({
      selectedTabId: id
    });

    getOrders().then((result)=>{
      const { code, data = [], message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }

      this.setData({
        orders: data
      })
    })
  },
  tabChange($event){
    const { id = {} } = $event.currentTarget.dataset;
    this.setData({
      selectedTabId: id
    })
  },
  cancelOrder($event){
    const { orders } = $event.detail;
    this.setData({
      orders,
    });
  }
})
