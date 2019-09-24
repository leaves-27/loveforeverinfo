import { getQuery, getOrderStatus } from '../../utils/util.js';
import getOrders from "../../apis/order/getOrders";
import cancelOrder from '../../apis/order/cancelOrder';
import confirmSign from "../../apis/order/confirmSign";

Page({
  data: {
    tabs: getOrderStatus(),
    selectedTabId: "",
    orders: [],
    page: 1,
    pageSize: 10
  },
  onLoad: function () {
    const { id = '' } = getQuery();
    this.setData({
      selectedTabId: id
    });
    this.fetchOrders();
  },
  fetchOrders(){
    getOrders().then((result)=>{
      const { code, data = [], message } = result;
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }

      this.setData({
        orders: data
      })
    })
  },
  tabChange($event){
    const { id = {} } = $event.currentTarget.dataset;
    this.setData({
      selectedTabId: id,
      page: 1,
    });
    this.fetchOrders();
  },
  cancelOrder($event){
    const { id } = $event.detail;
    cancelOrder(id).then((result)=>{
      const { code } = result;
      if (code * 1 === 1) {
        // 将订单从当前页面删除，并刷新结果列表
        const orders = JSON.parse(JSON.stringify(this.data.orders));
        const index = orders.findIndex((item)=>{
          return item.orderId === id;
        });
        if (index > -1){
          orders.splice(index ,1);
        }
        this.setData({
          orders
        });
      } else{
        wx.showToast({
          icon: 'none',
          title: '订单取消失败,请稍后重试或联系客服'
        });
      }
    }).catch((error)=>{
      console.error(error);
      wx.showToast({
        icon: 'none',
        title: '订单取消失败,请稍后重试或联系客服'
      });
    })
  },
  confirmSign($event){
    const { id } = $event.detail;
    const _self = this;
    wx.showModal({
      content: '你确认签收吗?',
      success(){
        confirmSign({
          orderId: id
        }).then(({ code })=>{
          if (code * 1 === 1){
            // 将订单从当前页面删除，并刷新结果列表
            const orders = JSON.parse(JSON.stringify(_self.data.orders));
            const index = orders.findIndex((item)=>{
              return item.orderId === id;
            });
            if (index > -1){
              orders.splice(index ,1);
            }
            _self.setData({
              orders
            });
            wx.showToast({
              icon: 'none',
              title: '签收成功'
            });
          } else {
            wx.showToast({
              icon: 'none',
              title: '签收失败,请稍后重试或联系客服'
            });
          }
        }).catch((error)=>{
          console.error(error);
          wx.showToast({
            icon: 'none',
            title: '签收失败,请稍后重试或联系客服'
          });
        });
      }
    })
  }
})
