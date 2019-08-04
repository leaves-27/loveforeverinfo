import qs from 'qs';
// import getUserInfo from '../../apis/getUserInfo';
import getUserInfo from '../../mock/getUserInfo';
import { getOrderStatus, placeholderUrl } from '../../utils/util';

Page({
  data: {
    orderStatus: getOrderStatus(),
    name: '',
    phone: '',
    score: 0,
    qrUrl: placeholderUrl,
    userLogoUrl: '',
    addressIconUrl: ''
  },
  goMyQr() {
    const query = {
      name: this.data.name,
      userLogoUrl: this.data.userLogoUrl
    };
    wx.navigateTo({
      url: `../my-qr/my-qr?$${qs.stringify(query,  { encodeValuesOnly: true })}`
    })
  },
  goMyOrder($event){
    const { item } = $event.currentTarget.dataset;
    const { id } = item;

    const query = {
      id
    };
    wx.navigateTo({
      url: `../my-order/my-order?$${qs.stringify(query)}`
    })
  },
  onLoad(){
    getUserInfo().then((result)=>{
      const { code, data, message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const {
        name,
        phone,
        score,
        qrUrl,
        userLogoUrl,
        addressIconUrl
      } = data;

      this.setData({
        name,
        phone,
        score,
        qrUrl,
        userLogoUrl,
        addressIconUrl
      })
    })
  },
})
