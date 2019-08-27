import { getQuery } from '../../utils/util.js';

// import getAddresses from '../../apis/getAddresses.js';
import getAddresses from "../../mock/address/getAddresses";
import updateDefaultAddress from '../../mock/address/updateDefaultAddress';

Page({
  data: {
    addresses: [],
    selectedAddressId: ''
  },
  goCreateAddress(){
    wx.navigateTo({
      url: `../address/address`
    })
  },
  addressChange(data){
    const { id } = data.detail || {};
    this.setData({
      selectedAddressId: id
    });
    updateDefaultAddress({ addressId: id }).then((result)=>{
      const { code, data = {}, message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const { addresses, addressId } = data;
      this.setData({
        addresses,
        selectedAddressId: addressId
      })
    })
  },
  onLoad: function () {
    const { statusId = '0' } = getQuery();
    getAddresses().then((result)=>{
      const { code, data = {}, message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const { addresses, addressId } = data;
      this.setData({
        addresses,
        selectedAddressId: addressId
      })
    })
  },
})
