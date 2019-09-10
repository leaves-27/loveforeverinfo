import { request } from '../utils/util';
import {apiPrifix} from "../config/index";
export default ()=> new Promise( (resolve, reject)=>{
	request.request({
		isMock: false,
		isSuccess: false,
		url: `${apiPrifix}/order/getDeliveryWays`,
		method: 'get',
		success: (res)=>{
			resolve(res);
			// resolve({
			// 	code: 1,
			// 	data: [{
			// 		id: '01',
			// 		name: "快递配送",
			// 	}, {
			// 		id: '02',
			// 		name: "自提",
			// 	}]
			// })
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
