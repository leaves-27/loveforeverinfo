import { getQuery } from "../../utils/util";
import { staticPrifix } from '../../config/index'

import getInviteCode from "../../mock/user/getInviteCode";

Page({
  data: {
    name: '',
    userLogoUrl: '',
    qrUrl: '',
    qrBorderTop: `${staticPrifix}/qr_border-top.png`,
    qrBoundary: `${staticPrifix}/qr_border-middle.png`
  },
  onLoad: function () {
    const { name = '', userLogoUrl = '' } = getQuery();
    console.log('userLogoUrl', getQuery());
    this.setData({
      name,
      userLogoUrl
    });
    getInviteCode().then((result)=>{
      const { code, data, message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const {
        inviteCode,
      } = data;

      //根据inviteCode生成qrUrl;
      const qrUrl = '';

      this.setData({
        qrUrl,
      })
    })
  }
})
