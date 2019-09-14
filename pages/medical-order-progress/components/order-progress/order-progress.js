import computedBehavior from 'miniprogram-computed';
import { getKvs, OrderStatus } from "../../../../utils/util";

const ORDER = {
  createTime: '创建订单',
  confirmTime: '确认订单', // 创建订单和确认都要是红色，
  delivery_startTime: '开始配送', // 创建订单和确认都要是红色，
  delivery_receiveTime: '完成'
};

// 进度对应的订单状态
const PROGRESS = {
  [ORDER['createTime']]: OrderStatus['waitPay'],
  [ORDER['confirmTime']]: OrderStatus['confirmedOrder'],
  [ORDER['delivery_startTime']]: OrderStatus['startDelivery'],
  [ORDER['delivery_receiveTime']]: OrderStatus['received']
};

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
        },
        status: ''
      }
    },
  },
  data:{
    PROGRESS,
  },
  computed: {
    kvs() {
      return getKvs(ORDER, this.data.order);
    },
    progress(){
      const status = this.data.order.status;
      // 获取当前订单状态在订单状态列表中的索引.
      const index = Object.keys(PROGRESS).findIndex((item)=>{
        return PROGRESS[item] === status;
      });

      return index;
    }
  },
});
