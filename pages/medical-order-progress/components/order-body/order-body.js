import computedBehavior from 'miniprogram-computed';
import { staticPrifix } from '../../../../config/index'

const getKvs = (ORDER, order) => {
  const kvs = [];

  console.log('order:', JSON.stringify(order));
  console.log('Object.keys(order):', Object.keys(order));
  Object.keys(order).forEach((item) => {
    console.log('item:', item);

    if(typeof order[item] === 'object'){
      Object.keys(order[item]).forEach((subItem)=>{
        console.log('subItem:',subItem);
        console.log('ORDER[`${item}_${subItem}`]:', ORDER[`${item}_${subItem}`]);
        if (ORDER[`${item}_${subItem}`]){
          kvs.push({
            key: ORDER[`${item}_${subItem}`],
            value: order[item][subItem]
          });
        }
      });
    } else if (ORDER[item]){
      kvs.push({
        key: ORDER[item],
        value: order[item]
      })
    }
  });
  console.log('kvs:', kvs);
  return kvs;
};

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
      return getKvs(ORDER, this.data.order);
    },
  },
});
