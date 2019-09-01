import { getQuery } from '../../utils/util.js';
// import getOrders from '../../apis/getOrders.js';
// import submitPoint from '../../apis/submitPoint';
// import submitAddress from '../../apis/submitAddress';
// import getPoints from "../../mock/address/getTakeGoodPoints";
// import submitPoint from '../../mock/address/submitPoint';
import submitAddress from '../../mock/address/submitAddress';

Page({
  data: {
    name: '',
    phone: '',
    address: {
      region: ['浙江省', '杭州市', '西湖区'],
      detail: ''
    }
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  save(){
    submitAddress({
      name: this.data.name,
      phone: this.data.phone,
      address: `${this.data.address.region.join('')}${this.data.address.detail}`
    }).then((result)=>{
      const { code, data = [], message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const { addressId = '' } = data;

      const { reference = '' } = getQuery;

      wx.navigateTo({
        url: `/${ reference }?addressId=${ addressId }`
      })
    }).catch((error)=>{

    })
  },
  onLoad: function () {

  },
})
