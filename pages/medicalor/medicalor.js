import qs from 'qs';
// import getUserInfo from '../../apis/getUserInfo';
// import getOrders from '../../apis/getOrders';
import getUserInfo from '../../mock/getUserInfo';
import getDoctors from "../../mock/getDoctors";
import {staticPrifix} from "../../config/index";

Page({
  data: {
    name: '',
    phone: '',
    userLogoUrl: '',
    score: 0,
    orderCount: 0,
    doctors: [],
    qrUrl: `${staticPrifix}/qr.png`,
  },
  goMyQr() {
    const query = {
      name: this.data.name,
      userLogoUrl: this.data.userLogoUrl
    };
    wx.navigateTo({
      url: `../my-qr/my-qr?$${qs.stringify(query,  { encode: false })}`
    })
  },
  onLoad(){
    Promise.all([getUserInfo(), getDoctors()]).then((result)=>{
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
        userLogoUrl,
        name,
        phone,
        score,
        orderCount,
        doctors: doctorData
      })
    })
  },
})
