import { getQuery, navigateBack } from '../../utils/util.js';
// import getOrders from '../../apis/getOrders.js';
// import submitPoint from '../../apis/submitPoint';
// import submitAddress from '../../apis/submitAddress';
// import submitAddress from '../../apis/address/submitAddress';
import getPoints from "../../apis/address/getTakeGoodPoints";
import getAddresses from '../../apis/address/getAddresses';
import AddressType from '../../utils/AddressType'

Page({
  data: {
    tabs: [{
      id: '1',
      name: '自己提货'
    }, {
      id: '2',
      name: '送货上门'
    }],
    addresses: [],
    points: [],
    selectedTabId: '',
    selectedAddressId: '',
    newAddress: null
  },
  tabChange($event){
    const { item = {} } = $event.currentTarget.dataset;
    const { id } = item;
    this.setData({
      selectedTabId: id
    })
  },
  selectedPoint($event){
    const { id = '' } = $event.detail;
    const { selectedTabId, points, addresses, tabs } =  this.data;
    this.setData({
      selectedAddressId: id,
    });

    const items = selectedTabId === tabs[0].id ? points : addresses;
    const currentAddress = items.find((item)=>{
      return item.id === id;
    });

    navigateBack(1, {
      newAddress: currentAddress
    });
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  goCreateAddress(){
    wx.navigateTo({
      url: `../create-address/address`
    })
  },
  onShow(){
    const newAddress = this.data.newAddress;

    console.log('newAddress:', newAddress);
    if(newAddress){
      const { accountAddress } = newAddress;
      const { id, receiver, phone, province, city, district, addressDetail } = accountAddress;

      const currentAddresses = this.data.addresses;

      const index = currentAddresses.findIndex((item)=>{
        return item.id === id;
      });

      if (index === -1){
        const addresses = currentAddresses.concat([{
          id,
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
    const { addressId, type } = getQuery();

    console.log('addressId:', addressId);

    Promise.all([ getPoints(), getAddresses()]).then((result)=>{
      const { code, data = [], message } = result[0];
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }
      const { code: addressCode, data: addressData = [], message:addressMessage = '' } = result[1];
      if (addressCode * 1 !== 1) {
        throw new Error(addressMessage || '请求错误');
      }

      const selectedTabId = type === AddressType['keeper'] ? this.data.tabs[0].id : this.data.tabs[1].id;


      this.setData({
        points: data,
        addresses: addressData,
        selectedTabId,
        selectedAddressId: addressId
      });
    }).catch((error)=>{
      console.error(error);
    });
  }
})
