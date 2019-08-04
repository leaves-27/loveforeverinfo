import computedBehavior from 'miniprogram-computed';
import { placeholderUrl } from '../../utils/util.js';

Page({
  behaviors: [computedBehavior],
  data: {
    type: 1,
    name: '',
    phone: ''
  },
  computed: {
    loginLogoUrl(){
      if (this.data.type === 1){ // 医生
        return '1';
      } else if (this.data.type === 2){ // 医药代表
        return '2';
      } else if (this.data.type === 3){ // 派送员
        return '3';
      }
      return placeholderUrl; //普通用户
    },
  },
  methods:{
    goLogin(){
      login().then((item)=>{
        if(code !== 1){
          wx.showToast({
            title: '登录失败，请稍后重试'
          });
        } else {
          wx.showToast({
            title: '登录成功'
          });
        }
      }).catch((error)=>{
        wx.showToast({
          title: '登录失败，请稍后重试'
        });
      });
    }

  },
  onLoad: function () {
    // this.data.type === 1
  }
})
