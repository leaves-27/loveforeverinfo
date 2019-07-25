import { getQuery } from '../../utils/util.js';
// import getOrders from '../../apis/getOrders.js';
import getOrders from "../../mock/getOrders";

Page({
  data: {
    tabs: [{
      id: "0",
      name: "全部"
    }, {
      id: "1",
      name: "待付款"
    }, {
      id: "2",
      name: "配送中"
    }, {
      id: "3",
      name: "已签收"
    }],
    selectedTabId: "",
    orders: []
  },
  onLoad: function () {
    const { id = '0' } = getQuery();
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
  tabClick($event){
    const { item = {} } = $event.currentTarget.dataset;
    const { id } = item;
    this.setData({
      selectedTabId: id
    })
  },
  cancelOrder(){

  },
  goPay(){

  }
})
