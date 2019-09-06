import qs from "qs";
import getGood from "../../mock/good/getGood";
// import getGood from "../../mock/apis/getGood";
import { goUserHome } from '../../utils/util';
Page({
  data: {
    good: {},
    tabs: [{
      id: '01',
      name: '图文介绍'
    }, {
      id: '02',
      name: '规格参数'
    }],
    selectedTabId: "",
    index: 0,
    isShowModal: false,
  },
  buy(){
    this.setData({
      isShowModal: true
    });
  },
  change($event){
    const { current } = $event.detail;
    this.setData({
      index: current
    })
  },
  tabChange($event){
    const { id } = $event.currentTarget.dataset;
    this.setData({
      selectedTabId: id
    });
  },
  cancelModal($event){
    this.setData({
      isShowModal: false
    });
  },
  confirmModal($event){
    const { id, count } = $event.detail;
    const query = {
      id,
      count
    };
    this.setData({
      isShowModal: false
    });
    wx.navigateTo({
      url: `../order-confirm/order-confirm?$${qs.stringify(query)}`
    })
  },
  onLoad: function () {
    this.setData({
      selectedTabId: this.data.tabs[0].id
    });
    const role = wx.getStorageSync('userRole');
    if (role * 1 === 1){
      getGood().then((result)=>{
        const { code, data, message } = result;
        if (code !== 1) {
          throw new Error(message || '请求错误');
        }

        this.setData({
          good: data[0],
        })
      })
    } else {
      goUserHome(role);
    }
  }
})
