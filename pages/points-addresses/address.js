import { getQuery, navigateBack, clone } from '../../utils/util.js';
import getPoints from "../../apis/address/getTakeGoodPoints";
import getAddresses from '../../apis/address/getAddresses';
import AddressType from '../../utils/AddressType'
import router from '../../router';

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
    router.navigateTo({
      url: `/pages/create-address/address`
    })
  },
  onShow(){
    const newAddress = this.data.newAddress;

    if(newAddress){
      const { accountAddress } = newAddress;
      const { id, receiver, phone, province, city, district, addressDetail } = accountAddress;

      const currentAddresses = clone(this.data.addresses);

      const index = currentAddresses.findIndex((item)=>{
        return item.id === id;
      });

      if (index === -1){
        currentAddresses.unshift({
          id,
          name: receiver,
          phone,
          address: `${province}${city}${district}${addressDetail}`
        });
        this.setData({
          addresses: currentAddresses
        })
      }
    }
  },
  onLoad: function () {
    const { addressId, type } = getQuery();

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
