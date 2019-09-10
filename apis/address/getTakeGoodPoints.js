import {request} from "../../utils/util";
import {apiPrifix} from "../../config/index";

export default ()=> new Promise( (resolve, reject)=>{
	request.request({
		isMock: false,
		url: `${apiPrifix}/delivery/getTakeGoodPoints`,
		data: {},
		success: (res)=>{
			resolve(res);
			// resolve({
			// 	code: 1,
			// 	data: [{
			// 		id: '01',
			// 		name: '提货点1',
			// 		address: '浙江省杭州市古荡街道110号',
			// 	}, {
			// 		id: '02',
			// 		name: '提货点2',
			// 		address: '浙江省杭州市古荡街道120号',
			// 	}]
			// })
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
