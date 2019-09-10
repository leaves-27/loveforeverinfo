import { placeholderUrl, request } from '../../utils/util';
import { apiPrifix } from "../../config/index";

export default ()=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrifix}/account/getDoctors`,
		method: 'get',
		success: (res)=>{
			resolve(res);
			// resolve({
			// 	code: 1,
			// 	data: [{
			// 		id: '01',
			// 		name: '张医生',
			// 		logoUrl: placeholderUrl,
			// 		hospital: '市妇女儿童医院',
			// 		department: '妇产科',
			// 	}, {
			// 		id: '02',
			// 		name: '张医生',
			// 		logoUrl: placeholderUrl,
			// 		hospital: '市妇女儿童医院',
			// 		department: '妇产科',
			// 	}]
			// })
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
