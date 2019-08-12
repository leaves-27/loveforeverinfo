import { getQuery, placeholderUrl } from "../../utils/util";
import getMyQr from "../../mock/getMyQr";
import qs from 'qs';
// import { staticPrifix } from '../../config/index'
import { staticPrifix } from '../../mock/config';

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
    getMyQr().then((result)=>{
      const { code, data, message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const {
        qrUrl,
      } = data;

      this.setData({
        qrUrl,
      })
    })
  }
})
