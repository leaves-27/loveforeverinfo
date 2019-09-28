import qs from 'qs';
import { getOrderStatus, tabs } from '../../utils/util';
import { staticPrefix } from '../../config/index'

import getUserInfo from '../../apis/user/getUserInfo';
import router from '../../router';

Page({
  data: {
    orderStatus: getOrderStatus(),
    name: '',
    phone: '',
    score: 0,
    userLogoUrl: '',
    qrUrl: `${staticPrefix}/qr.png`,
    addressIconUrl: `${staticPrefix}/address.png`,
    scoreLogoUrl: `${staticPrefix}//xiyan.png`,
    appTabs: tabs
  },
  goMyQr() {
    const query = {
      name: this.data.name,
      userLogoUrl: this.data.userLogoUrl
    };
    router.navigateTo({
      url: `/pages/my-qr/my-qr?$${qs.stringify(query,  { encode: false })}`
    })
  },
  goMyOrder($event){
    const { id } = $event.currentTarget.dataset;
    const query = {
      id
    };
    router.navigateTo({
      url: `/pages/my-order/my-order?$${qs.stringify(query)}`
    })
  },
  goMyAdress(){
    router.navigateTo({
      url: `/pages/my-address/my-address`
    })
  },
  onLoad(){
    getUserInfo().then((result)=>{
      const { code, data, message } = result;
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }
      const {
        name,
        phone,
        score,
        logoUrl,
      } = data;

      this.setData({
        name,
        phone,
        score,
        userLogoUrl: logoUrl,
      })
    })
  },
})
