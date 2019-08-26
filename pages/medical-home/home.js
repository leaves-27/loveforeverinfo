import qs from 'qs';
import { staticPrifix } from "../../config/index";
import getUserInfo from '../../mock/getUserInfo';
import getMyDoctors from "../../mock/getMyDoctors";

Page({
  data: {
    name: '',
    phone: '',
    logoUrl: '',
    score: 0,
    orderCount: 0,
    doctors: [],
    qrUrl: `${staticPrifix}/qr.png`,
  },
  bindPhone(){
    wx.navigateTo({
      url: `../bind-phone/bind-phone`
    });
  },
  goMyQr() {
    const query = {
      name: this.data.name,
      userLogoUrl: this.data.logoUrl
    };
    wx.navigateTo({
      url: `../medical-my-qr/my-qr?$${qs.stringify(query,  { encode: false })}`
    })
  },
  goMyOrder() {
    wx.navigateTo({
      url: `../medical-my-order/my-order`
    })
  },
  onLoad(){
    Promise.all([getUserInfo(), getMyDoctors()]).then((result)=>{
      const { code, data, message } = result[0] || {};
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const {
        name,
        phone,
        score = 0,
        userLogoUrl,
        orderCount = 0
      } = data;

      const { code: doctorCode, data: doctorData, message: doctorMessage } = result[1] || {};
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }

      if (doctorCode !== 1) {
        throw new Error(doctorMessage || '请求错误');
      }

      this.setData({
        logoUrl: userLogoUrl,
        name,
        phone,
        score,
        orderCount,
        doctors: doctorData
      })
    })
  },
})
