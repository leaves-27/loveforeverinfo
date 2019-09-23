import computedBehavior from 'miniprogram-computed';
import { staticPrefix } from '../../../../config/index';
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
    addressIconUrl: `${staticPrefix}/address_selected.png`
  },
  computed: {
    kvs(){
      const ORDER = {
        orderCode : '订单编号',
        createTime: '创建时间',
        pay_payTime: '付款时间',
        confirmTime: '商家接单时间',
        receiveTime: '签收时间'
      };

      if (Object.keys(this.data.order).length > 0) {
        return getKvs(ORDER, this.data.order);
      }
      return [];
    },
  }
})
