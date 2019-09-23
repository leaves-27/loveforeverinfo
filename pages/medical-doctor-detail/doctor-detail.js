import qs from 'qs';
import getDoctorDetail from "../../apis/user/getDoctorDetail";
import { getQuery, createQrCode, saveImageToPhotosAlbum } from "../../utils/util";
import { baseUrlPrefix, staticPrefix} from "../../config/index";

Page({
  data: {
    name: '',
    phone: '',
    logoUrl: '',
    agency: '',
    department: '',
    score: 0,
    userCount: 0,
    level: '',
    qrIconUrl: `${staticPrefix}/qr.png`,
    isShowMoadl: false,
    qrUrl: '',
    canvas: {
      width: 700,
      height: 700
    }
  },
  showModal(){
    this.setData({
      isShowMoadl: true
    });

    const url = `${ baseUrlPrefix }/?cc=${this.data.inviteCode}`;
    const canvasId = 'myQrcode';
    const canvasWidth = this.data.canvas.width / 2;
    const canvasHeight = this.data.canvas.height / 2;

    createQrCode(url, canvasId, canvasWidth, canvasHeight).then((qrUrl)=>{
      this.setData({
        qrUrl
      });
    }).catch((error)=>{
      console.log(error);
    });
  },
  hideModal(){
    this.setData({
      isShowMoadl: false
    });
  },
  saveImageToPhotosAlbum(){
    saveImageToPhotosAlbum(this.data.qrUrl).then(()=>{
      wx.showToast({
        title: '保存二维码到相册成功',
        icon: 'none',
        duration: 2000
      });
    }).catch(() => {
      // wx.showToast({
      //   title: '保存二维码到相册失败',
      //   icon: 'none',
      //   duration: 2000
      // });
    });
  },
  onLoad(){
    const { id = '' } = getQuery();
    getDoctorDetail(id).then((result)=>{
      const { code, data, message } = result || {};
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }
      const {
        name = '',
        phone = '',
        score = 0,
        logoUrl = '',
        agency = '',
        department = '',
        userCount = 0,
        level = '',
        inviteCode=''
      } = data;

      this.setData({
        name,
        phone,
        score,
        logoUrl,
        agency,
        department,
        userCount,
        level,
        inviteCode
      });
    })
  },
})
