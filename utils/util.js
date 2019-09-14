import UserType from './UserType';
import OrderStatus from './OrderStatus';
import placeholderUrl from './placeholderUrl';
import tabs from './tabs';

import getOrderStatus from './getOrderStatus';
import getKvs from './getKvs';
import goPay from './goPay';
import goUserHome from './goUserHome';
import { getCurrentRoute, getQuery, navigateBack, saveImageToPhotosAlbum } from './wx';

import router from './router';
import request from './request';

import { createQrCode } from './qrcode';
import route from './route/index';

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
  router,
  route,
  tabs,
  createQrCode,
  saveImageToPhotosAlbum
}


