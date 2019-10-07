import qs from 'qs';
import { staticPrefix } from "../../config/index";
import getUserInfo from '../../apis/user/getUserInfo';
import getMyDoctors from "../../apis/user/getMyDoctors";
import router from '../../router';


Page({
  data: {
    name: '',
    phone: '',
    logoUrl: '',
    score: 0,
    orderCount: 0,
    doctors: [],
    qrUrl: `${staticPrefix}/qr.png`,
    roles: [],
    selectedRoleIndex: 0,
  },
  goMyQr() {
    router.navigateTo({
      url: `/pages/medical-my-qr/my-qr`
    })
  },
  goMyOrder() {},
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
      orderCount,
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
      logoUrl,
      orderCount,
      roles,
      selectedRoleIndex: selectedRoleIndex === -1 ? 0 : selectedRoleIndex
    });
  },
  setDoctors({ code, data, message }){
    if (code * 1 !== 1) {
      throw new Error(message || '请求错误');
    }
    this.setData({
      doctors: data
    });
  },
  onLoad(){
    Promise.all([getUserInfo(), getMyDoctors()]).then((result)=>{
      this.setUserInfo(result[0]);
      this.setDoctors(result[1]);
    })
  },
})
