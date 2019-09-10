import qs from 'qs';
import {OrderStatus, getOrderStatus, tabs} from '../../utils/util';
import { staticPrifix } from '../../config/index'

// import getUserInfo from '../../apis/getUserInfo';
import getUserInfo from '../../apis/user/getUserInfo';

Page({
  data: {
    orderStatus: getOrderStatus(),
    name: '',
    phone: '',
    score: 0,
    userLogoUrl: '',
    qrUrl: `${staticPrifix}/qr.png`,
    addressIconUrl: `${staticPrifix}/address.png`,
    scoreLogoUrl: `${staticPrifix}//xiyan.png`,
    appTabs: tabs
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
  goMyOrder($event){
    const { id } = $event.currentTarget.dataset;
    const query = {
      id
    };
    wx.navigateTo({
      url: `../my-order/my-order?$${qs.stringify(query)}`
    })
  },
  goMyAdress(){
    wx.navigateTo({
      url: `../my-address/my-address`
    })
  },
  bindPhone(){
    wx.navigateTo({
      url: `../bind-phone/bind-phone`
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
        userLogoUrl,
      } = data;

      this.setData({
        name,
        phone,
        score,
        userLogoUrl,
      })
    })
  },
})
