import { placeholderUrl } from '../../utils/util';
import { apiPrefix } from "../../config/index";
import request from "../../request";

export default ()=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrefix}/account/getUserInfo`,
		method: 'post',
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
