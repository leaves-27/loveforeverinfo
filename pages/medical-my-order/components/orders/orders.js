import qs from "qs";
import computedBehavior from 'miniprogram-computed';
import { getKvs, OrderStatus } from '../../../../utils/util.js';

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
      const unFinishOrders = [];
      const finishOrders = [];
      this.data.orders.forEach((item)=>{
        // 订单状态有:已下单1、已支付2、已确认3、开始配送4、配送中5、已签收6

        if(item.status === '6'){
          const ORDER = {
            user_name: '客户姓名',
            user_phone: '联系方式'
          };
          finishOrders.push({
            ...item,
            kvs: getKvs(ORDER, item)
          });
        } else {
          const ORDER = {
            user_name: '客户姓名',
            user_phone: '联系方式',
            createTime: '创建时间',
            orderCode : '订单编号',
            delivery_address: '配送地址',
          };
          unFinishOrders.push({
            ...item,
            kvs: getKvs(ORDER, item)
          });
        }
      });
      return this.data.selectedTabId === '1' ? unFinishOrders : finishOrders;
    },
  },
  methods: {
    goOrderDetail($event){
      const { id } = $event.currentTarget.dataset;
      const query = {
        id
      };
      wx.navigateTo({
        url: `../medical-order-detail/order-detail?$${qs.stringify(query)}`
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
      const { id } = $event.currentTarget.dataset;
      const query = {
        id
      };
      wx.navigateTo({
        url: `../order-detail/order-detail?$${qs.stringify(query)}`
      })
    },
    goConfirmOrder($event){

    },
    goOrderProgress($event){
      const { id } = $event.currentTarget.dataset;
      const query = {
        id
      };
      wx.navigateTo({
        url: `../medical-order-progress/order-progress?$${qs.stringify(query)}`
      });
    }
  }
})
