import qs from 'qs';
// import getUserInfo from '../../apis/getUserInfo';
import getUserInfo from '../../mock/getUserInfo';
import { placeholderUrl } from '../../utils/util';

Page({
  data: {
    orderStatus: [{
      id: '1',
      name: '待付款',
      iconUrl: placeholderUrl
    }, {
      id: '2',
      name: '配送中',
      iconUrl: placeholderUrl
    }, {
      id: '3',
      name: '已签收',
      iconUrl: placeholderUrl
    }, {
      id: '0',
      name: '全部',
      iconUrl: placeholderUrl
    }],
    name: '',
    phone: '',
    score: 0,
    qrUrl: '',
    logoUrl: '',
    addressIconUrl: ''
  },
  goMyQr() {
    wx.navigateTo({
      url: '../my-qr/my-qr'
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
        logoUrl,
        addressIconUrl
      } = data;

      this.setData({
        name,
        phone,
        score,
        qrUrl,
        logoUrl,
        addressIconUrl
      })
    })
  },
})
