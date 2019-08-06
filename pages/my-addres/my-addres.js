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
    customItem: '请选择省市区'
  },
  tabChange(){

  },
  onLoad: function () {
    const { statusId = '0' } = getQuery();
    this.setData({
      statusId
    });

    // getOrders().then((result)=>{
    //   const { code, data = [], message } = result;
    //   if (code !== 1) {
    //     throw new Error(message || '请求错误');
    //   }
    //
    //   this.setData({
    //     orders: data
    //   })
    // })
  },
})
