import { getQuery, placeholderUrl } from "../../utils/util";
import getMyQr from "../../mock/getMyQr";
import qs from 'qs';

Page({
  data: {
    name: '',
    userLogoUrl: '',
    qrUrl: '',
  },
  onLoad: function () {
    const { name = '', userLogoUrl = '' } = getQuery();
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
