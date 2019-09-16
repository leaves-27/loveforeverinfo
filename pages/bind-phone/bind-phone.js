import { placeholderUrl, goUserHome } from '../../utils/util.js';
import bindPhone from '../../apis/user/bindPhone';

Page({
  data: {
    phone: '',
    validationCode: '',
    isBindPhone: false,
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
  bindPhone(){
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
      isBindPhone: true
    });
    bindPhone({
      phone: this.data.phone,
      validationCode: this.data.validationCode
    }).then((result)=>{
      this.setData({
        isBindPhone: false
      });
      const { code, data } = result;
      if(code * 1 !== 1){
        wx.showToast({
          icon: 'none',
          title: '绑定失败，请稍后重试'
        });
      } else {
        const { role = '' } = data;
        if (role){
          wx.showToast({
            title: '绑定成功'
          });
          wx.setStorageSync('userRole', role);
          setTimeout(()=>{
            goUserHome(role);
          }, 1000);
        } else {
          wx.showToast({
            title: '绑定失败'
          });
        }
      }
    }).catch((error)=>{
      this.setData({
        isBindPhone: false
      });
      wx.showToast({
        icon: 'none',
        title: '登录失败，请稍后重试'
      });
    });
  },
  onLoad: function () {}
})
