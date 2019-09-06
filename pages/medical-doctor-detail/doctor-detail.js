import qs from 'qs';
import getDoctorDetail from "../../mock/user/getDoctorDetail";
import { getQuery } from "../../utils/util";
import { createQrCode } from '../../utils/qrcode';
import {staticPrifix} from "../../config/index";

Page({
  data: {
    name: '',
    phone: '',
    logoUrl: '',
    hospital: '',
    department: '',
    score: 0,
    userCount: 0,
    level: '',
    qrUrl: '',
    qrIconUrl: `${staticPrifix}/qr.png`,
  },
  showQrModal(){
    createQrCode(this.data.inviteCode, 'myQrcode', 200, 200).then((qrUrl)=>{
      this.setData({
        qrUrl
      });
    }).catch((error)=>{
      console.log(error);
    });
  },
  hideQrModal(){
    this.setData({
      qrUrl: ''
    });
  },
  downLoad(){
    const url = this.data.qrUrl;
    return new Promise((resolve, reject)=>{
      wx.downloadFile({
        url: url, //仅为示例，并非真实的资源
        success (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            wx.playVoice({
              filePath: res.tempFilePath
            })
          }
          resolve(res);
        },
        fail(res){
          reject(res);
        }
      })
    })
  },
  onLoad(){
    const { id = '' } = getQuery();
    getDoctorDetail(id).then((result)=>{
      const { code, data, message } = result || {};
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const {
        name = '',
        phone = '',
        score = 0,
        logoUrl = '',
        hospital = '',
        department = '',
        userCount = 0,
        level = '',
        inviteCode='xxxx'
      } = data;

      this.setData({
        name,
        phone,
        score,
        logoUrl,
        hospital,
        department,
        userCount,
        level,
        inviteCode
      });
    })
  },
})
