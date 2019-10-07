import qs from "qs";
import {getUrlQuery, goUserHome, tabs} from '../../utils/util'
import router from "../../router";
import getGood from "../../apis/good/getGood";
import Role from '../../role';

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
    selectedTabId: "01",
    index: 0,
    isShowModal: false,
    selectedTabIndex: 0,
    appTabs: tabs
  },
  buy() {
    this.setData({
      isShowModal: true
    });
  },
  change($event) {
    const { current } = $event.detail;
    this.setData({
      index: current
    })
  },
  tabChange($event) {
    const { id } = $event.currentTarget.dataset;
    this.setData({
      selectedTabId: id
    });
  },
  cancelModal($event) {
    this.setData({
      isShowModal: false
    });
  },
  confirmModal($event) {
    const { id } = $event.detail;
    const query = {
      id: this.data.good.id,
      featureId: id
    };
    this.setData({
      isShowModal: false
    });
    router.navigateTo({
      url: `/pages/order-confirm/order-confirm?$${qs.stringify(query)}`
    });
  },
  onShow(){
    getApp().globalData.selectedTabIndex = 0;
  },
  onLoad() {
    const role = wx.getStorageSync('userRole');
    if (!!role && role !== Role['customer']){
      goUserHome(role);
    } else {
      getApp().globalData.selectedTabIndex = 0;
      getGood().then((result)=>{
        const { code, data, message } = result;
        if (code * 1 !== 1) {
          throw new Error(message || '请求错误');
        }

        this.setData({
          good: data[0],
          selectedTabIndex: 0
        })
      });
    }
  }
})
