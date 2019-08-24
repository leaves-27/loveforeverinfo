import computedBehavior from 'miniprogram-computed';

Component({
  behaviors: [computedBehavior],
  properties: {
    order: {
      type: Object,
      value: {
        createTime: '',
        confirmTime: '',
        receiveTime: '',
        delivery: {
          startTime: ''
        }
      }
    },
  },
  computed: {
    progress() {
      // status:
      // 1: 待支付
      // 2: 已支付
      // 3: 确认订单
      // 4: 开始配送
      // 5: 配送中
      // 6: 已签收
      return [{
        id: 1,
        name: '创建订单',
        time: this.data.order.createTime,
      }, {
        id: 3,
        name: '确认订单',
        time: this.data.order.confirmTime
      }, {
        id: 4,
        name: '开始配送',
        time: this.data.order.delivery.startTime
      }, {
        id: 6,
        name: '完成',
        time: this.data.order.receiveTime
      }]
    },
  },
});
