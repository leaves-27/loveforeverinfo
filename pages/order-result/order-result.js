import { getQuery, placeholderUrl } from '../../utils/util.js';
import getOrderDetail from "../../apis/order/getOrderDetail";

Page({
  data: {
    good: {
      "id": "",
      "name": "",
      "logoUrl": "",
      "price": ""
    },
    delivery: {
      "id": "",
      "wayId": "",
      "name": "",
      "phone": "",
      "address": "",
      "fee": "",
      "startTime": "",
      "endTime": ""
    },
    pay: {
      "wayId": "",
      "payTime": ""
    },
    orderCode: "",
    createTime: "",
    confirmTime: "",
    receiveTime: "",
    status: "",
    count: ""
  },
  onLoad: function () {
    const { orderId = '0' } = getQuery();
    getOrderDetail(orderId).then((result)=>{
      const { code, data = [], message } = result;
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }

      this.setData({
        ...data
      })
    })
  },
})
