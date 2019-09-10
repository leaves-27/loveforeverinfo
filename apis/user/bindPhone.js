import { placeholderUrl, request } from '../../utils/util';
import { apiPrifix } from "../../config/index";

export default ({ phone, validationCode })=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrifix}/account/bindphone`,
		data: {
			phone,
			validationCode
		},
		method: 'post',
		success: (res)=>{
			// resolve(res);
			resolve({
				code: 1, //
				data: null
			})
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
