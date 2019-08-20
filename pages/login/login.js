import computedBehavior from 'miniprogram-computed';
import { placeholderUrl, UserType } from '../../utils/util.js';
import login from '../../mock/login';

Page({
  behaviors: [computedBehavior],
  data: {
    type: 1,
    name: '',
    phone: ''
  },
  computed: {
    loginLogoUrl(){
      if (this.data.type === UserType['DOCUTOR']){ // 医生 doctor
        return '1';
      } else if (this.data.type === UserType['SALES_REPRESENTATIVE']){ // 医药代表sales representative
        return '2';
      } else if (this.data.type === UserType['COURIER']){ // 派送员 courier
        return '3';
      }
      return placeholderUrl; //普通用户 customer
    },
  },
  methods:{
    goLogin(){
      login().then((item)=>{
        const { code, data } = item;
        if(code !== 1){
          wx.showToast({
            title: '登录失败，请稍后重试'
          });
        } else {
          wx.showToast({
            title: '登录成功'
          });

          if (data.userType === 1){
            wx.navigateTo({
              url: `../doctor/doctor`
            })
          }

          if (data.userType === 2){
            wx.navigateTo({
              url: `../medicalor/medicalor`
            })
          }

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
