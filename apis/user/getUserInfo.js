import { placeholderUrl, request } from '../../utils/util';
import { apiPrifix } from "../../config/index";

export default ()=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrifix}/account/getUserRole`,
		method: 'get',
		success: (res)=>{
			resolve(res);
			// resolve({
			// 	code: 1,
			// 	data: {
			// 		name: '疯趣的二师兄',
			// 		phone: '135****8888',
			// 		score: 200000,
			// 		userLogoUrl: placeholderUrl,
			// 		addressIconUrl: placeholderUrl
			// 	}
			// });
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
