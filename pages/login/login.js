import { placeholderUrl, getQuery } from '../../utils/util.js';
import login from '../../mock/login/login';
// import login from '../../apis/login/login';

Page({
  data: {
    phone: '',
    validationCode: '',
    isLogin: false,
    logoUrl: placeholderUrl
  },
  changePhone($event){
    this.setData({
      phone: $event.detail.value
    });
  },
  changeVerticaltionCode($event){
    this.setData({
      validationCode: $event.detail.value
    });
  },
  goUserHome(userRole){
    if (userRole * 1 === 1){ // 消费者
      wx.navigateTo({
        url: `../index/index`
      });
    } else if(userRole * 1 === 2){ // 医生
      wx.navigateTo({
        url: `../doctor/doctor`
      })
    } else if (userRole * 1 === 3){// 医药代表
      wx.navigateTo({
        url: `../medical-home/home`
      });
    } else if (userRole * 1 === 4){ // 派送员
      // 暂无
    }
  },
  login(){
    if (this.data.isLogin){
      return;
    }
    if (!this.data.phone || this.data.phone.length !== 11){
      wx.showToast({
        icon: 'none',
        title: '手机号不正确，请重新输入'
      });
      return ;
    }

    this.setData({
      isLogin: true
    });
    login(this.data.phone,this.data.validationCode).then((result)=>{
      this.setData({
        isLogin: false
      });
      const { code, data } = result;
      if(code !== 1){
        wx.showToast({
          icon: 'none',
          title: '登录失败，请稍后重试'
        });
      }
      const { token, type, phone } = data;
      wx.setStorageSync('userRole', type);
      wx.setStorageSync('token', token);
      wx.setStorageSync('phone', phone);

      const { url = '' } = getQuery();
      console.log('=====role:', type);

      if (!!url && type === 1){
        wx.navigateTo({
          url,
        });
      } else {
        this.goUserHome(type);
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
