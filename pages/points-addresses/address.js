import { getQuery, navigateBack } from '../../utils/util.js';
// import getOrders from '../../apis/getOrders.js';
// import submitPoint from '../../apis/submitPoint';
// import submitAddress from '../../apis/submitAddress';
// import submitAddress from '../../mock/address/submitAddress';
import getPoints from "../../mock/address/getTakeGoodPoints";
import getAddresses from '../../mock/address/getAddresses';

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
      address: currentAddress
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
  onLoad: function () {
    const { addressId } = getQuery();

    Promise.all([ getPoints(), getAddresses()]).then((result)=>{
      const { code, data = [], message } = result[0];
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const { code: addressCode, data: addressData = [], message:addressMessage = '' } = result[1];
      if (addressCode !== 1) {
        throw new Error(addressMessage || '请求错误');
      }

      const selectedTabId = addressId ? this.data.tabs[0].id : this.data.tabs[1].id;

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
