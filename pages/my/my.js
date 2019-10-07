import qs from 'qs';
import { getOrderStatus, tabs } from '../../utils/util';
import { staticPrefix } from '../../config/index'

import getUserInfo from '../../apis/user/getUserInfo';
import router from '../../router';

Page({
  data: {
    orderStatus: getOrderStatus(),
    roles: [],
    selectedRoleIndex: 0,
    name: '',
    phone: '',
    score: 0,
    userLogoUrl: '',
    qrUrl: `${staticPrefix}/qr.png`,
    addressIconUrl: `${staticPrefix}/address.png`,
    scoreLogoUrl: `${staticPrefix}//xiyan.png`,
    appTabs: tabs
  },
  goMyQr() {
    const query = {
      name: this.data.name,
      userLogoUrl: this.data.userLogoUrl
    };
    router.navigateTo({
      url: `/pages/my-qr/my-qr?$${qs.stringify(query,  { encode: false })}`
    })
  },
  goMyOrder($event){
    const { id } = $event.currentTarget.dataset;
    const query = {
      id
    };
    router.navigateTo({
      url: `/pages/my-order/my-order?$${qs.stringify(query)}`
    })
  },
  goMyAdress(){
    router.navigateTo({
      url: `/pages/my-address/my-address`
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
  onLoad(){
    getUserInfo().then((result)=>{
      const { code, data, message } = result;
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }
      const {
        name,
        phone,
        score,
        logoUrl,
        roles = []
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
        selectedRoleIndex: selectedRoleIndex === -1 ? 0 : selectedRoleIndex
      })
    })
  },
})
