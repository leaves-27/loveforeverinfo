import computedBehavior from 'miniprogram-computed';
import { staticPrefix } from '../../../../config/index'
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
    addressIconUrl: `${staticPrefix}/address_selected.png`
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
      const DeliveryWay = {
        '1': '快递配送',
        '2': '自提'
      };
      const PayWay = {
        '0': '微信支付',
        '1': '线下支付'
      };
      if (Object.keys(this.data.order).length > 0) {
        return getKvs(ORDER, this.data.order).map((item)=>{
          const key = item.key;
          let value;
          if (item.key === ORDER['delivery_wayId']) {
             value = DeliveryWay[item.value];
          } else if (item.key === ORDER['pay_wayId']){
             value = PayWay[item.value];
          } else if(item.key === ORDER['delivery_address']){
            value = item.value.replace(/\s/g, '');
          } else {
            value = item.value;
          }
          return {
            key,
            value
          }
        });
      }
      return [];
    },
  },
});
