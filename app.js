import { patchPage, patchComponent } from 'miniprogram-computed';
import { goUserHome, router, route } from "./utils/util";
import autoLogin from './apis/login/autoLogin';


App({
  deps: {
    patchPage, patchComponent
  },
  onLaunch: function () {
    // const role = wx.getStorageSync('userRole');
    // if (!role){ //
    //   autoLogin().then((result)=>{
    //     const { token, type } = result;
    //     wx.setStorageSync('token', token);
    //     if (!!!type){
    //       const { redirect } = route;
    //       router.redirectTo({
    //         url: redirect
    //       });
    //     } else {
    //       wx.setStorageSync('userRole', type);
    //       goUserHome(role);
    //     };
    //   });
    // } else {
    //   goUserHome(role);
    // }
  },
  globalData: {
    userInfo: null
  }
})
