import { getQuery } from '../../utils/util.js';
import getAddresses from "../../apis/address/getAddresses";
import updateDefaultAddress from '../../apis/address/updateDefaultAddress';
import getUserDefaultAddress from "../../apis/address/getUserDefaultAddress";
import deleteAddress from "../../apis/address/delete";
import router from '../../router';

Page({
  data: {
    addresses: [],
    selectedAddressId: ''
  },
  goCreateAddress(){
    router.navigateTo({
      url: `/pages/create-address/address`
    })
  },
  addressChange($event){
    const { id } = $event.detail || {};
    this.setData({
      selectedAddressId: id
    });
    updateDefaultAddress({ addressId: id }).then((result)=>{
      const { code, data = {}, message } = result;
      if (code * 1 !== 1) {
        wx.showToast({
          icon: 'none',
          title: '设置默认地址失败，请稍后重试或联系客服'
        });
        throw new Error(message || '请求错误');
      }
      wx.showToast({
        icon: 'none',
        title: '设置默认地址成功'
      });
    })
  },
  deleteAddress($event){
    const { id } = $event.detail || {};
    const _self = this;

    wx.showModal({
      title: '删除',
      content: '你确认要删除当前地址吗?',
      success (res) {
        if (res.confirm) {
          deleteAddress({ id }).then((result)=>{
            const { code,  message } = result;
            if (code * 1 !== 1) {
              wx.showToast({
                icon: 'none',
                title: '删除失败，请稍后重试或联系客服'
              });
              throw new Error(message || '请求错误');
            }
            const index = _self.data.addresses.findIndex((item)=>{
              return item.id === id;
            });
            let addresses = [];
            if (_self.data.addresses.length > 1){
              addresses = JSON.parse(JSON.stringify(_self.data.addresses)).splice(index, 1);
            }
            
            _self.setData({
              addresses
            });
            wx.showToast({
              icon: 'none',
              title: '删除成功'
            });
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShow(){
    const newAddress = this.data.newAddress;
    if(newAddress){
      const { accountAddress } = newAddress;
      const { id, receiver, phone, province, city, district, addressDetail } = accountAddress;

      const currentAddresses = this.data.addresses;

      const index = currentAddresses.findIndex((item)=>{
        return item.id === id;
      });

      if (index === -1){
        const addresses = currentAddresses.concat([{
          id: `${id}`,
          name: receiver,
          phone,
          address: `${province}${city}${district}${addressDetail}`
        }]);
        this.setData({
          addresses,
        })
      }
    }
  },
  onLoad: function () {
    const { statusId = '0' } = getQuery();
    Promise.all([getAddresses(), getUserDefaultAddress()]).then((result)=>{
      const { code, data = {}, message } = result[0];
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }
      const { code: defaultAddressesCode, data:defaultAddressesData = {}, message: defaultAddressesMessage = '' } = result[1];
      if (defaultAddressesCode * 1 !== 1) {
        throw new Error(defaultAddressesMessage || '请求错误');
      }
      const { id } = defaultAddressesData;
      this.setData({
        addresses: data,
        selectedAddressId: id
      })
    })
  },
})
