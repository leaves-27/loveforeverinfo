import qs from 'qs';
import { staticPrifix} from '../config/index';
import { getCurrentRoute, getQuery, navigateBack, request } from './wx';

/**
 * 占位图片
 * */
const placeholderUrl = 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png';


/**
 * 用户类型MAP
 * */
const UserType = {
  'DOCTOR': 'DOCTOR',
  'SALES_REPRESENTATIVE': 'SALES_REPRESENTATIVE',
  'COURIER': 'COURIER',
  'CUSTOMER': 'CUSTOMER'
};


/**
* 订单状态MAP
* */
const OrderStatus = {
  'waitPay': '1',
  'payed': '2',
  'confirmedOrder': '3',
  'startDelivery': '4',
  'deliverying': '5',
  'reviced': '6',
  'all': '0'
};

/**
* 生成键值对渲染数据列表。类似:[{ key: '手机号', value: '13854152631' }]
* */
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

/**
* 1: 待支付
* 2: 已支付
* 3: 确认订单
* 4: 开始配送
* 5: 配送中
* 6: 已签收
* */
const getOrderStatus = ()=>{
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

/**
 *
 * */
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
};

const goUserHome = function(userRole){
  if (userRole * 1 === 1){ // 消费者
    wx.navigateTo({
      url: `pages/index/index`
    });
  } else if(userRole * 1 === 2){ // 医生
    wx.navigateTo({
      url: `pages/doctor/doctor`
    })
  } else if (userRole * 1 === 3){// 医药代表
    wx.navigateTo({
      url: `pages/medical-home/home`
    });
  } else if (userRole * 1 === 4){ // 派送员
    // 暂无
  }
}

module.exports = {
  placeholderUrl,
  UserType,
  OrderStatus,
  getCurrentRoute,
  getQuery,
  request,
  getKvs,
  getOrderStatus,
  goPay,
  navigateBack,
  goUserHome
}


