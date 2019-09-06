import { patchPage, patchComponent } from 'miniprogram-computed';
import { goUserHome } from "./utils/util";

App({
  deps: {
    patchPage, patchComponent
  },
  onLaunch: function () {
    const role = wx.getStorageSync('userRole');
    if (role * 1 !== 1){
      goUserHome(role);
    }
  },
  globalData: {
    userInfo: null
  }
})
