import { apiPrifix } from '../../config/index';
import { request } from '../utils/util';

export default (phone)=> new Promise( (resolve, reject)=>{
	request({
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
