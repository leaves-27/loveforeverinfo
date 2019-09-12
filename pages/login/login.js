import { placeholderUrl, getQuery, router, goUserHome } from '../../utils/util.js';
import login from '../../apis/login/login';
// import login from '../../apis/login/login';
import getTempCredentials from '../../apis/login/getTempCredentials';
import sendValidationCode from '../../apis/login/sendValidationCode';

Page({
  data: {
    phone: '18857152332',
    validationCode: '',
    isLogin: false,
    logoUrl: placeholderUrl,
    time: 0,
  },
  changePhone($event){
    this.setData({
      phone: $event.detail.value
    });
  },
  changeValidationCodeCode($event){
    this.setData({
      validationCode: $event.detail.value
    });
  },
  countDown(time){
    this.setData({
      time,
    });
    if (time !== 0){
      setTimeout(()=>{
        this.countDown( this.data.time - 1);
      }, 1000);
    }
  },
  sendValidationCode(){
    if (this.data.time !== 0){
      return;
    }
    this.countDown(60);
    sendValidationCode(this.data.phone).then((result)=>{
      wx.showToast({
        icon: 'none',
        title: '验证码发送成功，请在短信中查看'
      });
    }).catch(()=>{
      wx.showToast({
        icon: 'none',
        title: '验证码发送失败，请在稍后重试'
      });
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

    getTempCredentials().then((code)=>{
      return login(this.data.phone,this.data.validationCode, code);
    })
    .then((result)=>{
      this.setData({
        isLogin: false
      });
      const { code, data } = result;
      if(code * 1 !== 1){
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

      if (!!url){
        router.navigateTo({
          url,
        });
      } else {
        goUserHome(type);
      }
    }).catch((error)=>{
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
