import qs from "qs";
import computedBehavior from 'miniprogram-computed';
import { getQuery, goPay } from '../../../../utils/util.js';

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
    newOrders(){
      const unFinishOrders = [];
      const finishOrders = [];
      this.data.orders.forEach((item)=>{
        // 订单状态有:已下单1、已支付2、已确认3、开始配送4、配送中5、已签收6
        if(item.deliveryStatus !== 6){
          unFinishOrders.push({
            ...item,
            kvs: this.getKvs(item)
          });
        } else {
          finishOrders.push({
            ...item,
            kvs: this.getKvs(item)
          });
        }
      });

      return this.data.selectedTabId === 1 ? unFinishOrders : finishOrders;
    },
  },
  methods: {
    getKvs(order){
      const ORDER = {
        name: '客户姓名',
        phone: '联系方式',
        createTime: '创建时间',
        orderCode : '订单编号',
        address: '配送地址',
      };
      const kvs = [];
      Object.keys(order).forEach((item) => {
        if (order[item] !== 'object' && ORDER[item]){
          kvs.push({
            key: ORDER[item],
            value: order[item]
          })
        } else if(item === 'user' || item === ''){
          Object.keys(order[item]).forEach((subItem)=>{
            if (ORDER[subItem]){
              kvs.push({
                key: ORDER[subItem],
                value: order[item][subItem]
              })
            }
          });
        }
      });
      return kvs;
    },
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
