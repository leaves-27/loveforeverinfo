import qs from 'qs';
import { staticPrefix } from "../../config/index";
import getUserInfo from '../../apis/user/getUserInfo';
import getMyDoctors from "../../apis/user/getMyDoctors";

Page({
  data: {
    name: '',
    phone: '',
    logoUrl: '',
    score: 0,
    orderCount: 0,
    doctors: [],
    qrUrl: `${staticPrefix}/qr.png`,
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
    // wx.navigateTo({
    //   url: `../medical-my-order/my-order`
    // })
  },
  setUserInfo({ code, data, message }){
    if (code * 1 !== 1) {
      throw new Error(message || '请求错误');
    }
    const {
      name,
      phone,
      score,
      logoUrl,
      orderCount
    } = data;

    this.setData({
      name,
      phone,
      score,
      logoUrl,
      orderCount,
    });
  },
  setDoctors({ code, data, message }){
    if (code * 1 !== 1) {
      throw new Error(message || '请求错误');
    }
    this.setData({
      doctors: data
    });
  },
  onLoad(){
    Promise.all([getUserInfo(), getMyDoctors()]).then((result)=>{
      this.setUserInfo(result[0]);
      this.setDoctors(result[1]);
    })
  },
})
