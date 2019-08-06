import { getQuery } from '../../utils/util.js';
// import getOrders from '../../apis/getOrders.js';
import getOrders from "../../mock/getOrders";
import { placeholderUrl } from '../../utils/util';

Page({
  data: {
    tabs: [{
      id: '1',
      name: '自己提货'
    }, {
      id: '2',
      name: '送货上门'
    }],
    selectedTabId: '',
    customItem: '请选择省市区',
    addressId: ''
  },
  tabChange($event){
    const { item = {} } = $event.currentTarget.dataset;
    const { id } = item;
    this.setData({
      selectedTabId: id
    })
  },
  onLoad: function () {
    const { addressId = '0' } = getQuery();
    this.setData({
      addressId
    });
  },
})
