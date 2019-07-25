import {getQuery} from "../../utils/util";
import getMyQr from "../../mock/getMyQr";

Page({
  data: {
    name: '',
    userLogoUrl: '',
    qrUrl: '',
  },
  onLoad: function () {
    const { name = '', userLogoUrl = '' } = getQuery();

    console.log('query:', getQuery());
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
