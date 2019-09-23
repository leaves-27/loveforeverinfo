import { OrderStatus } from '../../utils/util.js';
import { getOrderCategoryByIsFinish } from "./utils";

import getOrders from "../../apis/order/getOrders";
import confirmOrder from '../../apis/order/confirmOrder';
import cancelOrder from '../../apis/order/cancelOrder';

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
    unFinishOrders: [],
    finishOrders: []
  },
  onLoad: function () {
    this.setData({
      selectedTabId: '1'
    });

    getOrders().then((result)=>{
      const { code, data = [], message } = result;
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }

      const { unFinishOrders , finishOrders } = getOrderCategoryByIsFinish(data);
      this.setData({
        unFinishOrders,
        finishOrders
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
    const { id } = $event.detail;
    cancelOrder(id).then((result)=>{
      const { code, data, message } = result;
      if (code * 1 === 1){
        // 将订单从当前页面删除，并刷新结果列表
        const orders = JSON.parse(JSON.stringify(this.data.unFinishOrders));
        const index = orders.findIndex((item)=>{
          return item.orderId === id;
        });
        console.log();
        if (index > -1){
          orders.splice(index ,1);
          this.setData({
            unFinishOrders: orders
          })
        }
      } else{
        wx.showToast({
          icon: 'none',
          title: '订单取消失败,请稍后重试或联系客服'
        });
      }
    }).catch((error)=>{

    })
  },
  confirmOrder($event){
    const { id } = $event.detail;
    console.log('confirmOrder-id:', id);
    // 确认以后,将其从当前列表中删除
    confirmOrder(id).then((result)=>{
      console.log('confirmOrder-result:', result);
      const { code, data, message } = result;
      if (code * 1 === 1){
        // 将订单从当前页面删除，并刷新结果列表
        const orders = JSON.parse(JSON.stringify(this.data.unFinishOrders));
        const index = orders.findIndex((item)=>{
          return item.id === id;
        });
        if (index > -1){
          orders.splice(index, 1, {
            ...orders[index],
            status: OrderStatus['confirmedOrder']
          });
          this.setData({
            unFinishOrders: orders
          })
        }
      } else{
        wx.showToast({
          icon: 'none',
          title: '订单确认失败,请稍后重试或联系客服'
        });
      }
    }).catch((error)=>{

    })
  }
})
