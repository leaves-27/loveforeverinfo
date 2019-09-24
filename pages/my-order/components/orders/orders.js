import qs from "qs";
import computedBehavior from 'miniprogram-computed';
import { goPay, OrderStatus } from '../../../../utils/util.js';

Component({
  behaviors: [computedBehavior],
  data: {
    OrderStatus
  },
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
    newOrders(){
      const orders = [];
      this.data.orders.forEach((item)=>{
        if (item.status === OrderStatus['waitPay'] || item.status === OrderStatus['confirmedOrder'] || item.status === OrderStatus['received']){
          if (this.data.selectedTabId === OrderStatus['all']){
            orders.push(item);
          } else if(this.data.selectedTabId === item.status){
            orders.push(item);
          }
        }
      });

      return orders;
    },
  },
  methods: {
    confirmSign($event){
      const { id } = $event.currentTarget.dataset;
      this.triggerEvent('confirmSign', {
        id
      });
    },
    goOrderDetail($event){
      const { id } = $event.currentTarget.dataset;
      const query = {
        id
      };
      wx.navigateTo({
        url: `../order-detail/order-detail?$${qs.stringify(query)}`
      })
    },
    cancelOrder($event){
      const { id } = $event.currentTarget.dataset;
      this.triggerEvent('cancelOrder', {
        id
      });
    },
    goBuy($event){
      wx.redirectTo({
        url: `/pages/index/index`
      });
    },
    goScanDeliveyDetail($event){
      wx.navigateTo({
        url: `/pages/order-detail/order-detail?$${qs.stringify(query)}`
      })
    },
    goPay,
  }
})
