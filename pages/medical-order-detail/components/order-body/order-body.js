import computedBehavior from 'miniprogram-computed';
import { staticPrifix } from '../../../../config/index'
import { getKvs } from '../../../../utils/util'


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
        user_name: '客户姓名',
        user_phone: '联系方式',
        delivery_address: '配送地址',
        delivery_wayId: '配送方式',
        pay_wayId: '付款方式',
        createTime: '创建时间',
        receiveTime: '完成时间',
        orderCode : '订单编号',
      };
      if (Object.keys(this.data.order).length > 0) {
        return getKvs(ORDER, this.data.order);
      }
      return [];
    },
  },
});
