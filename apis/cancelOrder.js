import { apiPrifix } from '../config/index';
export default (status)=>{
	return new Promise(async (resolve, reject)=>{
		wx.request({
			url: 'getOrders', //
			data: {
				status,
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
