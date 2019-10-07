import getUserInfo from '../../apis/user/getUserInfo';
import getConsumerOrderFlow from "../../apis/user/getConsumerOrderFlow";
import getConsumers from "../../apis/user/getConsumers";
import router from "../../router";
import {staticPrefix} from "../../config/index";

Page({
  data: {
    name: '',
    phone: '',
    userLogoUrl: '',
    tabs: [{
      id: '01',
      name: '销售概况'
    }, {
      id: '02',
      name: '消费者信息'
    }],
    consumerOrderFlow: [],
    consumers: [],
    selectedTabId: '01',
    roles: [],
    selectedRoleIndex: 0,
    qrUrl: `${staticPrefix}/qr.png`,
  },
  tabChange($event){
    const { item = {} } = $event.currentTarget.dataset;
    const { id } = item;
    this.setData({
      selectedTabId: id
    })
  },
  setConsumerOrderFlow({ code = 0, data = [], message = '' } = {}){
    if (code * 1 !== 1) {
      throw new Error(message || '请求错误');
    }
    this.setData({
      ConsumerOrderFlow: data
    });
  },
  setConsumers({ code = 0, data = [], message = '' } = {}){
    if (code * 1 !== 1) {
      throw new Error(message || '请求错误');
    }
    this.setData({
      consumers: data
    });
  },
  goMyQr(){
    router.navigateTo({
      url: `/pages/medical-my-qr/my-qr`
    })
  },
  pickerChange(e){
    const selectedIndex = e.detail.value;
    const { value = '', name } = this.data.roles[selectedIndex] || {};

    if (this.data.selectedRoleIndex !== selectedIndex) {
      wx.setStorageSync('userRole', '');
      wx.setStorageSync('token', '');
      router.redirectTo({
        url: `/pages/authorize/authorize?role=${value}`
      });
    } else {
      wx.showToast({
        title: `你当前已经是${name}`
      })
    }
  },
  setUserInfo({ code, data, message }){
    if (code * 1 !== 1) {
      throw new Error(message || '请求错误');
    }
    const {
      name,
      phone,
      score,
      logoUrl,
      roles = [],
      orderCount = 0
    } = data;

    const selectedRoleIndex = roles.findIndex((item)=>{
      const role = wx.getStorageSync('userRole');
      return item.value === role;
    });

    this.setData({
      name,
      phone,
      score,
      userLogoUrl: logoUrl,
      roles,
      orderCount,
      selectedRoleIndex: selectedRoleIndex === -1 ? 0 : selectedRoleIndex
    });
  },
  onLoad(){
    Promise.all([getUserInfo(), getConsumerOrderFlow(1), getConsumers()]).then((result)=>{
      this.setUserInfo(result[0]);
      this.setConsumerOrderFlow(result[1]);
      this.setConsumers(result[2]);
    })
  },
})
