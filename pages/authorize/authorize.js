import getTempCredentials from '../../apis/login/getTempCredentials';
import { loginByWxTempCode } from '../../apis/login/login';
import { postUserInfo } from '../../apis/login/postUserInfo';
import { getQuery, goUserHome, router } from "../../utils/util";

Page({
  data: {
    isShowButton: false
  },
  getAuthorize(data = {}){
    const { detail = {} } = data;
    const { userInfo = {} } = detail;
    postUserInfo(userInfo).then((result)=>{
      const { code } = result;
      if(code * 1 !== 1){
        wx.showToast({
          icon: 'none',
          title: '授权失败，请检查网络或重新进入登录授权'
        });
        return;
      }
      const role = wx.getStorageSync('userRole');
      this.jump(role);
    }).catch((err)=>{
      console.log('err:', err);
      wx.showToast({
        title: '授权失败，请检查网络或重新进入登录授权',
        icon: 'none',
        duration: 2000
      });
    })
  },
  jump(role){
    const { url = '' } = getQuery();
    if (!!url){
      router.navigateTo({
        url,
      });
    } else if (!!role){
      goUserHome(role);
    } else {
      router.redirectTo({
        url: '/pages/bind-phone/bind-phone'
      });
    }
  },
  onLoad: function () {
    const role = wx.getStorageSync("userRole");
    if (!!role) { // 如果授权已存在，则跳转到对应主页.
      goUserHome(role);
    } else {
      getTempCredentials().then((code)=>{
        return loginByWxTempCode(code); //
      }).then((result)=>{
        const { code, data } = result;
        if(code * 1 !== 1){
          wx.showToast({
            icon: 'none',
            title: '授权失败，请稍后重试'
          });
          return;
        }
        const { token = '', role = '', authuserinfo = false} = data;
        wx.setStorageSync('token', token);
        wx.setStorageSync('userRole', role);

        if (authuserinfo) {
          this.jump(role);
        } else{
          this.setData({
            isShowButton: true
          });
        }
      });
    }
  }
})
