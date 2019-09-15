import { getQuery, placeholderUrl } from '../../utils/util.js';
import getOrderDetail from "../../apis/order/getOrderDetail";

Page({
  data: {
    "good": {
      "id": "商品名称",
      "name": "商品名称",
      "logoUrl": "商品图url",
      "price": "商品单价"
    },
    "delivery": {
      "id": "配送Id",
      "wayId": "配送方式Id",
      "name": "配送人姓名",
      "phone": "配送人联系电话",
      "address": "配送地址",
      "fee": "配送费",
      "startTime": "开始配送时间",
      "endTime": "结束配送时间"
    },
    "pay": {
      "wayId": "支付方式id",
      "payTime": "支付时间"
    },
    "orderCode": "订单编号",
    "createTime": "订单创建时间",
    "confirmTime": "订单确认时间",
    "receiveTime": "订单签收时间",
    "status": "订单状态",
    "count": "商品购买数量"
  },
  onLoad: function () {
    const { orderId = '0', status } = getQuery();

    getOrderDetail(orderId).then((result)=>{
      const { code, data = [], message } = result;
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }

      this.setData({
        status,
        good: data
      })
    })
  },
})
