import getTempCredentials from '../../apis/login/getTempCredentials';
import { loginByWxTempCode } from '../../apis/login/login';
import { postUserInfo } from '../../apis/login/postUserInfo';
import { getQuery, goUserHome, getUrlQuery, goBindPhone } from "../../utils/util";
import router from "../../router";

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
  jump(role, inviteCode){
    const { url = '' } = getQuery();
    if (!!url){
      router.navigateTo({
        url,
      });
    } else if (!!role){
      goUserHome(role);
    } else {
      goBindPhone(inviteCode);
    }
  },
  getUserRoleToRelativePage(inviteCode = ''){
    const role = wx.getStorageSync("userRole");
    if (!!role && !inviteCode) { // 如果授权已存在且不存在邀请码的时候，则跳转到对应主页.
      goUserHome(role);
    } else { //
      getTempCredentials().then((code)=>{
        const { role = '' } = getQuery();
        return loginByWxTempCode(code, inviteCode, role); //
      }).then((result)=>{
        const { code, data } = result;
        if(code * 1 !== 1){
          wx.showToast({
            icon: 'none',
            title: '授权失败，请稍后重试'
          });
          return;
        }
        const { token = '', role = '', authuserinfo = false } = data;
        wx.setStorageSync('token', token);
        wx.setStorageSync('userRole', role);

        if (authuserinfo) {
          this.jump(role, inviteCode);
        } else{
          this.setData({
            isShowButton: true
          });
        }
      });
    }
  },
  onLoad: function (options) { //
    const { q = '' } = options;
    if (!!options.q) {
      const { cc = '' } = getUrlQuery(decodeURIComponent(q));
      this.getUserRoleToRelativePage(cc);
    } else {
      this.getUserRoleToRelativePage();
    }
  }
})
