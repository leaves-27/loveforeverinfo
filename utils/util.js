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
    console.log('decoder:', qs.parse(item, { decode : true }));
    query[`${item.slice(1)}`] = options[item];
  });
  return query;
};

const getOrderStatus = ()=>{
  return [{
    id: '1',
    name: '待付款',
    iconUrl: `${staticPrifix}/waitpay.png`
  }, {
    id: '2',
    name: '配送中',
    iconUrl: `${staticPrifix}/deliverying.png`
  }, {
    id: '3',
    name: '已签收',
    iconUrl: `${staticPrifix}/signed.png`
  }, {
    id: '0',
    name: '全部',
    iconUrl: `${staticPrifix}/all.png`
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
}

module.exports = {
  placeholderUrl,
  getCurrentRoute,
  getQuery,
  getOrderStatus,
  goPay,
  UserType,
}


