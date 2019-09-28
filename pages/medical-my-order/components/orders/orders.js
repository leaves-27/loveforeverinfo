import qs from "qs";
import computedBehavior from 'miniprogram-computed';
import { getKvs, OrderStatus } from '../../../../utils/util.js';
import router from '../../../../router';

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
  },
  methods: {
    cancelOrder($event){
      const { id } = $event.currentTarget.dataset;
      this.triggerEvent('cancelOrder', {
        id
      });
    },
    confirmOrder($event){
      console.log('confirmOrder-$event:', $event);
      const { id } = $event.currentTarget.dataset;
      this.triggerEvent('confirmOrder', {
        id
      });
    },
    goOrderDetail($event){
      const { id } = $event.currentTarget.dataset;
      const query = {
        id
      };
      router.navigateTo({
        url: `/pages/medical-order-detail/order-detail?$${qs.stringify(query)}`
      })
    },
    goOrderProgress($event){
      const { id } = $event.currentTarget.dataset;
      const query = {
        id
      };
      router.navigateTo({
        url: `/pages/medical-order-progress/order-progress?$${qs.stringify(query)}`
      });
    }
  }
})
