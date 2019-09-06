//app.js
import { patchPage, patchComponent } from 'miniprogram-computed';
import { goUserHome } from "./utils/util";
// import getTempCredentials from './apis/loginAndAuthorize/getTempCredentials';
// import login from './apis/loginAndAuthorize/login';
// import getAuthorize from './apis/loginAndAuthorize/getAuthorize';
// import getUserInfo from './apis/loginAndAuthorize/getUserInfo';
// import getUserRole from './apis/loginAndAuthorize/getUserRole'

App({
  deps: {
    patchPage, patchComponent
  },
  // getUserInfo(){
  //   getUserInfo().then((result)=>{
  //     console.log('result:', result);
  //     wx.setStorageSync('userInfo', result);
  //   }).catch((error)=>{
  //     console.error(error);
  //   })
  // },
  // goUserHome(userRole){
  //   if (userRole * 1 === 1){ // 消费者
  //     wx.navigateTo({
  //       url: `../index/index`
  //     });
  //   } else if(userRole * 1 === 2){ // 医生
  //     wx.navigateTo({
  //       url: `../doctor/doctor`
  //     })
  //   } else if (userRole * 1 === 3){// 医药代表
  //     wx.navigateTo({
  //       url: `../medical-home/home`
  //     });
  //   } else if (userRole * 1 === 4){ // 派送员
  //     // 暂无
  //   }
  // },
  onLaunch: function () {
    //
    // const userRole = wx.getStorageSync('userRole');
    // if (userRole) {
    //   this.goUserHome(userRole);
    // } else {
    //   getTempCredentials().then((code)=>{
    //     return code;
    //   })
    //   .then(login)
    //   .then((result)=>{
    //     const { code, data, message } = result;
    //     if(code !== 1){
    //       wx.showToast({
    //        icon: 'none',
    //        content: '登录失败，请稍后重新登录'
    //       });
    //       throw new Error(message || '登录失败');
    //     }
    //     const { role, token, phone } = data;
    //     wx.setStorageSync('token', token);
    //     if (role){
    //       wx.setStorageSync('userRole', role);
    //       this.goUserHome(role);
    //       return;
    //     }
    //     if (phone){
    //       wx.setStorageSync('phone', phone);
    //     }
    //   })
    //   .catch((error)=>{
    //     throw new Error(error || '获取临时凭证或登录或授权或用户角色失败');
    //   });
    // }

    const role = wx.getStorageSync('userRole');
    if (role * 1 !== 1){
      goUserHome(role);
    }
  },
  globalData: {
    userInfo: null
  }
})
