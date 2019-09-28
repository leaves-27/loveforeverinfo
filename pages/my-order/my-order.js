import qs from "qs";
import {
  getQuery,
  getNewArrAfterSpliceSpecialItem,
  getOrderStatus,
  confirmSign,
  goBuy,
  goPay
} from '../../utils/util.js';
import getOrders from "../../apis/order/getOrders";
import cancelOrder from '../../apis/order/cancelOrder';

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
    const _self = this;
    wx.showModal({
      content: '你确认要取消当前订单吗?',
      success(res){
        if (res.confirm){
          cancelOrder(id).then((result)=>{
            const { code } = result;
            if (code * 1 === 1) {
              _self.setData({
                orders: getNewArrAfterSpliceSpecialItem(_self.data.orders, id)
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
        }
      }
    });
  },
  confirmSign($event){
    const { id } = $event.detail;
    confirmSign(id, ()=>{
      // 将订单从当前页面删除，并刷新结果列表
      this.setData({
        orders: getNewArrAfterSpliceSpecialItem(this.data.orders, id)
      });
    });
  },
  goOrderDetail($event){
    const { id } = $event.detail;
    const query = {
      id
    };
    wx.navigateTo({
      url: `../order-detail/order-detail?$${qs.stringify(query)}`
    })
  },
  goBuy,
  goPay
});
