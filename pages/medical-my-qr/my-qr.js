import { getQuery, createQrCode, saveImageToPhotosAlbum } from "../../utils/util";
import { baseUrlPrefix, staticPrefix } from '../../config/index'
import getUserInfo from "../../apis/user/getUserInfo";

Page({
  data: {
    name: '',
    userLogoUrl: '',
    qrBorderTop: `${staticPrefix}/qr_border-top.png`,
    qrBoundary: `${staticPrefix}/qr_border-middle.png`,
    isShowMoadl: false,
    qrUrl: '',
    canvas: {
      width: 502,
      height: 502
    }
  },
  saveImageToPhotosAlbum(){
    saveImageToPhotosAlbum(this.data.qrUrl).then(()=>{
      wx.showToast({
        title: '保存二维码到相册成功',
        icon: 'none',
        duration: 2000
      });
    }).catch(()=>{
      // wx.showToast({
      //   title: '保存二维码到相册失败',
      //   icon: 'none',
      //   duration: 2000
      // });
    });
  },
  onLoad: function () {
    getUserInfo().then((result)=>{
      const { code, data, message } = result;
      if (code * 1 !== 1) {
        throw new Error(message || '请求错误');
      }
      const {
        inviteCode,
        name,
        logoUrl
      } = data;

      this.setData({
        name,
        userLogoUrl: logoUrl
      });

      const url = `${ baseUrlPrefix }/?cc=${inviteCode}`;
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
    })
  }
})
