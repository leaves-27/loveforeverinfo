import { getQuery } from '../../utils/util.js';
// import getOrders from '../../../../apis/getOrders.js';
import getOrders from "../../mock/order/getOrders";

Page({
  data: {
    tabs: [{
      id: "1",
      name: "待分配"
    }, {
      id: "2",
      name: "已完成"
    }],
    selectedTabId: "",
    orders: []
  },
  onLoad: function () {
    // const { id = '0' } = getQuery();
    this.setData({
      selectedTabId: '1'
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
    const { item = {} } = $event.currentTarget.dataset;
    const { id } = item;
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
