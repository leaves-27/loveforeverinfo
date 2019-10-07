// import getUserInfo from '../../apis/getUserInfo';
// import getOrders from '../../apis/getOrders';
import getUserInfo from '../../apis/user/getUserInfo';
import getConsumerOrderFlow from "../../apis/user/getConsumerOrderFlow";
import getConsumers from "../../apis/user/getConsumers";
import { goBindPhone } from "../../utils/util";
import router from "../../router";

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
    selectedRoleIndex: 0
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
  pickerChange(e){
    const selectedIndex = e.detail.value;
    if (this.data.selectedRoleIndex !== selectedIndex) {
      const { value = '' } = this.data.roles[selectedIndex] || {};
      wx.setStorageSync('userRole', '');
      wx.setStorageSync('token', '');
      router.redirectTo({
        url: `/pages/authorize/authorize?role=${value}`
      });
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

    this.setData({
      name,
      phone,
      score,
      userLogoUrl: logoUrl,
      roles,
      orderCount
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
