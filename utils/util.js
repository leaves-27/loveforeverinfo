import UserType from './UserType';
import OrderStatus from './OrderStatus';
import placeholderUrl from './placeholderUrl';

import getOrderStatus from './getOrderStatus';
import getKvs from './getKvs';
import goPay from './goPay';
import goUserHome from './goUserHome';
import { getCurrentRoute, getQuery, navigateBack } from './wx';

import router from './router';
import request from './request';

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
  goUserHome,
  router
}


