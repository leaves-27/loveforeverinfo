import { placeholderUrl, getQuery, router, goUserHome } from '../../utils/util.js';
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

      if (!!url && type === 1){
        router.navigateTo({
          url,
        });
      } else {
        goUserHome(type);
      }
    }).catch((error)=>{
      console.log('test');
      this.setData({
        isLogin: false
      });
      wx.showToast({
        icon: 'none',
        title: '登录失败，请稍后重试'
      });
    });
  },
  onLoad: function () {}
})
