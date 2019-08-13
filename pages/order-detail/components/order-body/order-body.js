import computedBehavior from 'miniprogram-computed';
import { staticPrifix } from '../../config/index'

Component({
  behaviors: [computedBehavior],
  properties: {
    order: {
      type: Object,
      value: {}
    }
  },
  data: {
    addressIconUrl: `${staticPrifix}/address_selected.png`
  },
  computed: {
    kvs(){
      const ORDER = {
        code : '订单编号',
        createTime: '创建时间',
        payTime: '付款时间',
        successTime: '成交时间',
      };
      const kvs = [];
      const order = this.data.order;
      Object.keys(order).forEach((item) => {
        if (order[item] !== 'object' && ORDER[item]){
          kvs.push({
            key: ORDER[item],
            value: order[item]
          })
        }
      });
      return kvs;
    },
  }
})
