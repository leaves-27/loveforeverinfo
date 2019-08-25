const placeholderUrl = 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png';

import qs from 'qs';
import { staticPrifix } from '../config/index';

const getCurrentRoute = ()=>{
  let pages = getCurrentPages();
  let currPage = null;
  if (pages.length) {
    currPage = pages[pages.length - 1];
  }
  return currPage;
};

const getQuery = ()=>{
  const { options = {} } = getCurrentRoute() || {};
  const query = {};
  Object.keys(options).map((item)=>{
    query[`${item.slice(1)}`] = options[item];
  });
  return query;
};
// const OrderStatus = {
//   'wait_pay': '待支付',
//   'payed': '已支付',
//   'confirmOrdered': '确认订单',
//   'startDelivery': '开始配送',
//   'deliverying': '配送中',
//   'reviced': '已签收'
// };

const OrderStatus = {
  'waitPay': '1',
  'payed': '2',
  'confirmedOrder': '3',
  'startDelivery': '4',
  'deliverying': '5',
  'reviced': '6',
  'all': '0'
};

// status == number ====

const getOrderStatus = ()=>{
  // 1: 待支付
  // 2: 已支付
  // 3: 确认订单
  // 4: 开始配送
  // 5: 配送中
  // 6: 已签收
  return [{
    id: OrderStatus['all'],
    name: '全部',
    iconUrl: `${staticPrifix}/all.png`
  },{
    id: OrderStatus['waitPay'],
    name: '待付款',
    iconUrl: `${staticPrifix}/waitpay.png`
  }, {
    id: OrderStatus['deliverying'],
    name: '配送中',
    iconUrl: `${staticPrifix}/deliverying.png`
  }, {
    id: OrderStatus['reviced'],
    name: '已签收',
    iconUrl: `${staticPrifix}/signed.png`
  }]
};

const  goPay = function($event){
  // const { id } = $event.currentTarget.dataset;
  // const query = {
  //   id
  // };
  const query = {
    statusId: 0
  };
  wx.navigateTo({
    url: `../order-result/order-result?$${qs.stringify(query)}`
  });
}

const UserType = {
  'DOCTOR': 'DOCTOR',
  'SALES_REPRESENTATIVE': 'SALES_REPRESENTATIVE',
  'COURIER': 'COURIER',
  'CUSTOMER': 'CUSTOMER'
};

const getKvs = (ORDER, order) => {
  const kvs = [];
  Object.keys(order).forEach((item) => {
    if(typeof order[item] === 'object'){
      Object.keys(order[item]).forEach((subItem)=>{
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
  return kvs;
};

module.exports = {
  OrderStatus,
  placeholderUrl,
  getCurrentRoute,
  getQuery,
  getOrderStatus,
  goPay,
  UserType,
  getKvs
}


