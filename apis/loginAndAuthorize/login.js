import { apiPrifix } from '../../config/index';

export default (code)=> new Promise( (resolve, reject)=>{
	wx.request({
		url: `${apiPrifix}/login`,
		method: 'get',
		data: {
			code,
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
