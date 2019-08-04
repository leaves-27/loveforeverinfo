import { getQuery } from '../../utils/util.js';

Page({
  data: {
    tabs: [{
      id: "0",
      name: "全部"
    }, {
      id: "1",
      name: "待付款"
    }, {
      id: "2",
      name: "配送中"
    }, {
      id: "3",
      name: "已签收"
    }],
    selectedTabId: "",
  },
  onLoad: function () {
    const { id = '0' } = getQuery();
    this.setData({
      selectedTabId: id
    });
  },
  tabChange($event){
    const { item = {} } = $event.currentTarget.dataset;
    const { id } = item;
    this.setData({
      selectedTabId: id
    })
  }
})
