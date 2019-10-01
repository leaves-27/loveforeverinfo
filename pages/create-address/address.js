import { getQuery } from '../../utils/util.js';
// import getOrders from '../../apis/getOrders.js';
// import submitPoint from '../../apis/submitPoint';
// import submitAddress from '../../apis/submitAddress';
// import getPoints from "../../apis/address/getTakeGoodPoints";
// import submitPoint from '../../apis/address/submitPoint';
import createNewAddress from '../../apis/address/createNewAddress';
import {navigateBack} from "../../utils/util";

Page({
  data: {
    name: '',
    phone: '',
    region: ['浙江省', '杭州市', '西湖区'],
    desc: ''
  },
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  nameChange(e){
    this.setData({
      name: e.detail.value
    })
  },
  phoneChange(e){
    this.setData({
      phone: e.detail.value
    })
  },
  detailChange(e){
    this.setData({
      desc: e.detail.value
    })
  },
  save(){
    if (!this.data.name){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (!this.data.phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (!this.data.desc){
      wx.showToast({
        title: '详情地址不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    createNewAddress({
      name: this.data.name,
      phone: this.data.phone,
      address: {
        province: this.data.region[0],
        city: this.data.region[1],
        area: this.data.region[2],
        desc: this.data.desc
      }
    }).then((result)=>{
      const { code, data = [], message } = result;
      if (code * 1 !== 1) {
        wx.showToast({
          icon: 'none',
          title: '添加新地址失败'
        });
        throw new Error(message || '请求错误');
      }
      // const { addressId = '' } = data;
      wx.showToast({
        icon: 'none',
        title: '添加新地址成功'
      });

      setTimeout(()=>{
        navigateBack(1, {
          newAddress: data
        });
      }, 1000);
    }).catch((error)=>{

    })
  },
  onLoad: function () {

  },
})
