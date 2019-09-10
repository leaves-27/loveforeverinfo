import { placeholderUrl, request } from '../../utils/util';
import { apiPrifix } from "../../config/index";

export default ()=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		// url: '',/applet/
	  url: `${apiPrifix}/account/getInviteCode`,
		method: 'get',
		success: (res)=>{
			resolve(res);
			// resolve({
			// 	code: 1,
			// 	data: {
			// 		inviteCode: 'xxxxxx',
			// 	}
			// })
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
