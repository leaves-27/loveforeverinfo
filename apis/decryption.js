import { apiPrifix } from '../config/index';

export default (iv, encryptedData)=>{
	return new Promise(async (resolve, reject)=>{
		wx.request({
			url: `${apiPrifix}/decryption`, //
			data: {
				iv,
				encryptedData
			},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success (res) {
				resolve(res)
			}
		});
	})
}
