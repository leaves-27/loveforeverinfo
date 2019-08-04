import { getQuery } from '../../../../utils/util.js';
// import getOrders from '../../../../apis/getOrders.js';
import getOrders from "../../../../mock/getOrders";
import qs from "qs";
import computedBehavior from 'miniprogram-computed';

Component({
  behaviors: [computedBehavior],
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    selectedTabId: {
      type: String,
      value: ''
    }
  },
  data: {
    orders: [],
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
  lifetimes: {
    ready () {
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
    cancelOrder(){

    },
    goPay($event){
      const { item } = $event.currentTarget.dataset;
      const { id } = item;

      const query = {
        id
      };
      wx.navigateTo({
        url: `../order-confirm/order-confirm?$${qs.stringify(query)}`
      })
    }
  }
})
