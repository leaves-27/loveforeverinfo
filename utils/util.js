import { getCurrentRoute, getQuery, navigateBack, saveImageToPhotosAlbum } from '@leaves-27/miniprogram';
import { createQrCode } from '@leaves-27/miniprogram-qr-code';
import { getUrlQuery, getKvs } from '@leaves-27/utils';
import clone from './clone';
import getNewArrAfterSpliceSpecialItem from './getNewArrAfterSpliceSpecialItem';

/**跟业务强相关的一些状态 start ***/
import OrderStatus from './OrderStatus';
import placeholderUrl from './placeholderUrl';
import tabs from './tabs';
import getOrderStatus from './getOrderStatus';
import PayWay from './PayWay';

import goPay from './goPay';
import goBuy from './goBuy';
import goUserHome from './goUserHome';
import confirmSign from './confirmSign';
import bindPhone from './bindPhone';
/**跟业务强相关的一些状态 end ***/

module.exports = {
  getQuery,
  getUrlQuery,
  getCurrentRoute,
  getKvs,
  navigateBack,
  createQrCode,
  saveImageToPhotosAlbum,
  clone,
  getNewArrAfterSpliceSpecialItem,

  placeholderUrl,
  OrderStatus,
  tabs,
  getOrderStatus,
  PayWay,

  goBuy,
  goUserHome,
  goPay,
  confirmSign,
  bindPhone
};


