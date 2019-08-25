import computedBehavior from 'miniprogram-computed';
import { staticPrifix } from '../../../../config/index';
import { getKvs } from '../../../../utils/util';

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
        orderCode : '订单编号',
        createTime: '创建时间',
        pay_payTime: '付款时间',
        successTime: '成交时间',
      };
      return getKvs(ORDER, this.data.order);
    },
  }
})
