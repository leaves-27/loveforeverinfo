import { getCurrentRoute, getQuery, navigateBack, saveImageToPhotosAlbum } from '@leaves-27/miniprogram';
import { createQrCode } from '@leaves-27/miniprogram-qr-code';
import { getUrlQuery, getKvs } from '@leaves-27/utils';

/**跟业务强相关的一些状态 start ***/
import OrderStatus from './OrderStatus';
import placeholderUrl from './placeholderUrl';
import tabs from './tabs';
import getOrderStatus from './getOrderStatus';

import goPay from './goPay';
import goUserHome from './goUserHome';
/**跟业务强相关的一些状态 end ***/

module.exports = {
  getQuery,
  getUrlQuery,
  getCurrentRoute,
  getKvs,
  navigateBack,
  createQrCode,
  saveImageToPhotosAlbum,

  placeholderUrl,
  OrderStatus,
  tabs,
  getOrderStatus,
  goUserHome,
  goPay,
}


