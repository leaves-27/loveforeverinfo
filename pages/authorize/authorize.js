import qs from 'qs';
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
  getUserRoleToRelativePage(inviteCode = ''){
    const role = wx.getStorageSync("userRole");
    if (!!role && !inviteCode) { // 如果授权已存在且不存在邀请码的时候，则跳转到对应主页.
      goUserHome(role);
    } else { //
      getTempCredentials().then((code)=>{
        return loginByWxTempCode(code, inviteCode); //
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
  },
  getUrlQuery(url){
    if (url.indexOf('?') > -1) {
      const urls = url.split('?');
      return qs.parse(urls[1]);
    }
    return {};
  },
  onLoad: function (options) {
    const { q = '' } = options;
    if (options.q !== undefined) {
      const { cc = '' } = this.getUrlQuery(decodeURIComponent(q));
      this.getUserRoleToRelativePage(cc);
    } else {
      this.getUserRoleToRelativePage();
    }
  }
})
