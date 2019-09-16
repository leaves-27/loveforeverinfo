import getTempCredentials from '../../apis/login/getTempCredentials';
import { loginByWxTempCode } from '../../apis/login/login';
import { getQuery, goUserHome, router } from "../../utils/util";

Page({
  data: {
    isShowButton: false
  },
  getAuthorize(data = {}){
    const { detail = {} } = data;
    const { userInfo = {} } = detail;
    getTempCredentials().then((code)=>{
      return loginByWxTempCode(code, userInfo);
    }).then((result)=>{
      const { code, data } = result;
      if(code * 1 !== 1){
        wx.showToast({
          icon: 'none',
          title: '授权失败，请稍后重试'
        });
        return;
      }
      const { token = '', role = ''} = data;
      wx.setStorageSync('token', token);
      wx.setStorageSync('userRole', role);
      const { url = '' } = getQuery();
      if (!!url){
        router.navigateTo({
          url,
        });
      } else if (!!role){
        goUserHome(type);
      } else {
        router.redirectTo({
          url: '/pages/bind-phone/bind-phone'
        });
      }
    }).catch((err)=>{
      console.log('err:', err);
      wx.showToast({
        title: '授权失败，请检查网络或重新进入登录授权',
        icon: 'none',
        duration: 2000
      });
    })
  },
  onLoad: function () {
    const role = wx.getStorageSync("userRole");
    if (!!role) { // 如果授权已存在，则跳转到对应主页.
      goUserHome(role);
    } else {
      this.setData({
        isShowButton: true
      })
    }
  }
})
