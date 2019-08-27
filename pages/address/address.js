import { getQuery } from '../../utils/util.js';
// import getOrders from '../../apis/getOrders.js';
// import submitPoint from '../../apis/submitPoint';
// import submitAddress from '../../apis/submitAddress';
import getPoints from "../../mock/address/getTakeGoodPoints";
import submitPoint from '../../mock/address/submitPoint';
import submitAddress from '../../mock/address/submitAddress';

Page({
  data: {
    tabs: [{
      id: '1',
      name: '自己提货'
    }, {
      id: '2',
      name: '送货上门'
    }],
    points: [],
    selectedTabId: '1',
    selectedPointId: '02',
    addressId: '',
    name: '',
    phone: '',
    address: {
      region: ['浙江省', '杭州市', '西湖区'],
      detail: ''
    }
  },
  tabChange($event){
    const { item = {} } = $event.currentTarget.dataset;
    const { id } = item;
    this.setData({
      selectedTabId: id
    })
  },
  selectedPoint($event){
    const { id = '' } = $event.currentTarget.dataset;

    this.setData({
      selectedPointId: id,
    });
    submitPoint({ pointId: id }).then((result)=>{
      const { code, data = [], message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }

      wx.navigateTo({
        url: `../my-address/my-address`
      })
    }).catch((error)=>{

    })
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

      wx.navigateTo({
        url: `../my-address/my-address`
      })
    }).catch((error)=>{

    })
  },
  onLoad: function () {
    const { addressId } = getQuery();

    if(addressId){
      // 拉取地址信息
    }else {

    }
    getPoints().then((result)=>{
      const { code, data = [], message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }

      this.setData({
        points: data
      })
    }).catch((error)=>{

    });
    this.setData({
      addressId
    });
  },
})
