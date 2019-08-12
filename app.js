//app.js
import { patchPage, patchComponent } from 'miniprogram-computed';
import getUserInfo from './apis/getOrders';
import getAuthorize from './apis/getAuthorize';

App({
  deps: {
    patchPage, patchComponent
  },
  getUserInfo(){
    getUserInfo().then((result)=>{
      console.log('result:', result);
      wx.setStorageSync('userInfo', result);
    }).catch((error)=>{
      console.error(error);
    })
  },
  goAuthorize(){

  },
  onLaunch: function () {
    // 进入后，判断用户是否授权。若已授权，则获取用户信息。否则弹框获取用户授权。然后再获取用户信息。
    // const isAuthedUserInfo = wx.getStorageSync('isAuthedUserInfo') || false;
    // if (!isAuthedUserInfo) {
    //   getAuthorize('userInfo').then((result)=>{
    //     wx.setStorageSync('isAuthedUserInfo', true);
    //     this.getUserInfo();
    //   });
    // } else {
    //   this.getUserInfo();
    // }
  },
  globalData: {
    userInfo: null
  }
})
