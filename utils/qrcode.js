import QR from '../lib/qrcode';

export const createQrCode = function (content, canvasId, cavW, cavH) {
	//调用插件中的draw方法，绘制二维码图片
	QR.api.draw(content, canvasId, cavW, cavH);
	return new Promise((resolve, reject)=>{
		wx.canvasToTempFilePath({
			canvasId,   // 这里canvasId即之前创建的canvas-id
			success: function (res) {
				let tempFilePath = res.tempFilePath;
				console.log(tempFilePath);
				resolve(tempFilePath);
			},
			fail: function (res) {
				reject(res);
			}
		});
	})

}
