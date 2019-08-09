import { getQuery, goPay } from '../../../../utils/util.js';
import qs from "qs";
import computedBehavior from 'miniprogram-computed';

Component({
  behaviors: [computedBehavior],
  properties: {
    orders: {
      type: Array,
      value: []
    },
    tabs: {
      type: Array,
      value: []
    },
    selectedTabId: {
      type: String,
      value: ''
    }
  },
  computed: {
    tabOrders(){
      const orders = [];
      if (this.data.selectedTabId === '0'){
        orders.push(...this.data.orders);
      } else {
        this.data.orders.forEach((item)=>{
          if(this.data.selectedTabId === item.status){
            orders.push(item);
          }
        })
      }
      return orders;
    },
  },
  methods: {
    goOrderDetail($event){
      const { item } = $event.currentTarget.dataset;
      const { id } = item;

      const query = {
        id
      };
      wx.navigateTo({
        url: `../order-detail/order-detail?$${qs.stringify(query)}`
      })
    },
    cancelOrder($event){
      const { id } = $event.currentTarget.dataset;
      const orders = JSON.parse(JSON.stringify(this.data.orders));

      // 将订单从当前页面删除，并刷新结果列表
      const index = orders.findIndex((item)=>{
        return item.id === id;
      });
      if (index > -1){
        orders.splice(index ,1);
      }

      this.triggerEvent('cancelorder', {
        orders
      })
    },
    goBuy($event){

    },
    goScanDeliveyDetail($event){
      wx.navigateTo({
        url: `../order-detail/order-detail?$${qs.stringify(query)}`
      })
    },
    goPay,
  }
})
