import { patchPage, patchComponent } from 'miniprogram-computed';
import { goUserHome, router, route } from "./utils/util";


App({
  deps: {
    patchPage, patchComponent
  },
  onLaunch: function () {},
  globalData: {
    userInfo: null
  }
})
