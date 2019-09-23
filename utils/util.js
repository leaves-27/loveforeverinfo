import UserType from './UserType';
import OrderStatus from './OrderStatus';
import placeholderUrl from './placeholderUrl';
import tabs from './tabs';

import getOrderStatus from './getOrderStatus';
import getKvs from './getKvs';
import goPay from './goPay';
import goUserHome from './goUserHome';
import { getCurrentRoute, getQuery, navigateBack, saveImageToPhotosAlbum } from './wx';

import { createQrCode } from './qrcode';
import getUrlQuery from './getUrlQuery';

module.exports = {
  placeholderUrl,
  UserType,
  OrderStatus,
  tabs,

  getQuery,
  getUrlQuery,
  getCurrentRoute,
  getKvs,
  getOrderStatus,

  navigateBack,
  goUserHome,

  createQrCode,
  saveImageToPhotosAlbum,

  goPay,
}


