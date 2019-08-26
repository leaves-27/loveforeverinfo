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
  onLaunch: function () {
    // 登录授权
    // 1.进行登录: token、type(消费者、医生、医药代表)
    // 2.获取授权: -------------------------
    // 3.获取用户信息(主要指手机号): ---------
    // 4.获取用户角色: getUserRole
    // 5.绑定手机号: bindPhone
    
    // const userRole = wx.getStorageSync('userRole');
    // if (userRole) {
    //   this.goUserHome(userRole);
    // } else {
    //   login().then((result)=>{
    //     const { code, data} = result;
    //     if(code !== 1){
    //       wx.showToast({
    //        icon: 'none',
    //        content: '登录失败，请稍后重新登录'
    //       });
    //       return;
    //     }
    //     const { role, token} = data;
    //     wx.setStorageSync('token', token);
    //     wx.setStorageSync('userRole', role);
    //
    //   }).then(()=>{
    //       //   getAuthorize('userInfo').then((result)=>{
    //     //     wx.setStorageSync('isAuthedUserInfo', true);
    //     //     this.getUserInfo();
    //     //   });
    //   }).then(()=>{
    //    getUserRole(phone).then((result)=>{
    //      const { code, data } = result;
    //       if(code !== 1){
    //         wx.showToast({
    //           icon: 'none',
    //           title: '绑定失败，请稍后重试'
    //         });
    //         return;
    //       }
    //      const { role } = data;
    //      this.goUserHome(role);
    //    })
    //   })
    // }
  },
  globalData: {
    userInfo: null
  }
})
