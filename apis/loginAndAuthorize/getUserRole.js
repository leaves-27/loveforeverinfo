import { apiPrifix } from '../../config/index';

export default (phone)=> new Promise( (resolve, reject)=>{
	wx.request({
		url: `${apiPrifix}/getUserRole`,
		method: 'get',
		data: {
			phone,
		},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success (res) {
			resolve(res.data)
		},
		fail(){
			reject(res.errMsg);
		},
	})
});
