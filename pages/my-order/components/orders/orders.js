import computedBehavior from 'miniprogram-computed';
import { OrderStatus, PayWay } from '../../../../utils/util.js';

Component({
  behaviors: [computedBehavior],
  data: {
    OrderStatus,
    PayWay
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
        if (this.data.selectedTabId === OrderStatus['all'] || this.data.selectedTabId === item.status){
          orders.push({
            ...item,
            shouldPayAmount: (item.good.price * item.count + item.delivery.fee * 1).toFixed(2)
          });
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
    cancelOrder($event){
      const { id } = $event.currentTarget.dataset;
      this.triggerEvent('cancelOrder', {
        id
      });
    },
    payOrder($event){
      const { id } = $event.currentTarget.dataset;
      this.triggerEvent('payOrder', {
        id
      });
    },
    reBuy($event){
      const { id } = $event.currentTarget.dataset;
      this.triggerEvent('reBuy', {
        id
      });
    },
    reOrder($event){
      const { id } = $event.currentTarget.dataset;
      this.triggerEvent('reOrder', {
        id
      });
    },
    orderDetail($event){
      const { id } = $event.currentTarget.dataset;
      this.triggerEvent('clickOrderItem', {
        id
      });
    },
  }
})
