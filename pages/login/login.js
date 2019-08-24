import computedBehavior from 'miniprogram-computed';
import { placeholderUrl, UserType } from '../../utils/util.js';
import login from '../../mock/login';

Page({
  behaviors: [computedBehavior],
  data: {
    type: 1,
    phone: '',
    validationCode: '',
    isLogining: false,
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
  changePhone($event){
    this.setData({
      phone: $event.detail.value
    });
  },
  goLogin(){
    if (!this.data.phone || this.data.phone.length !== 11){
      wx.showToast({
        icon: 'none',
        title: '手机号不正确，请重新输入'
      });
      return ;
    }
    console.log('phone:', this.data.phone);
    this.setData({
      isLogining: true
    });
    login({
      phone: this.data.phone,
      validationCode: this.data.validationCode
    }).then((result)=>{
      this.setData({
        isLogining: false
      });
      const { code, data } = result;

      console.log('result:', result);
      if(code !== 1){
        wx.showToast({
          icon: 'none',
          title: '登录失败，请稍后重试'
        });
      } else {
        wx.showToast({
          title: '登录成功'
        });

        if (data.userType === 1){
          wx.navigateTo({ // 医生
            url: `../doctor/doctor`
          })
        }

        if (data.userType === 2){
          wx.navigateTo({ // 医药代表
            url: `../medical-home/home`
          })
        }

      }
    }).catch((error)=>{
      wx.showToast({
        icon: 'none',
        title: '登录失败，请稍后重试'
      });
    });
  },
  onLoad: function () {}
})
