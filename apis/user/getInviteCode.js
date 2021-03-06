import { placeholderUrl } from '../../utils/util';
import { apiPrefix } from "../../config/index";
import request from "../../request";

export default ()=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		// url: '',/applet/
	  url: `${apiPrefix}/account/getInviteCode`,
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
