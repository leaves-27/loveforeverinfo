const placeholderUrl = 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png';

import qs from 'qs';

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
    iconUrl: placeholderUrl
  }, {
    id: '2',
    name: '配送中',
    iconUrl: placeholderUrl
  }, {
    id: '3',
    name: '已签收',
    iconUrl: placeholderUrl
  }, {
    id: '0',
    name: '全部',
    iconUrl: placeholderUrl
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

module.exports = {
  placeholderUrl,
  getCurrentRoute,
  getQuery,
  getOrderStatus,
  goPay,
}


