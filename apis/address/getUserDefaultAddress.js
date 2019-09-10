import {request} from "../../utils/util";
import { apiPrifix } from '../../config/index';

export default ()=> new Promise( (resolve, reject)=>{
	request.request({
		isMock: false,
		url: `${apiPrifix}/delivery/getUserDefaultAddress`,
		data: {},
		success: (res)=>{
			resolve(res);
			// resolve({
			// 	code: 1,
			// 	data: {
			// 		id: '01',
			// 		name: '赵四 188****3327',
			// 		address: '浙江杭州市滨江区中控科技园E幢22楼'
			// 	}
			// })
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
