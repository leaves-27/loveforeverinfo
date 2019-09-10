import {placeholderUrl, request} from "../../utils/util";
import { apiPrifix } from "../../config/index";

export default (status)=>{
	return new Promise(async (resolve, reject)=>{
		request.request({
			isMock: true,
			isSuccess: true,
			url: '',
			data: { id },
			success: (res)=>{
				// resolve(res);
				resolve({
					code: 1,
					data: {}
				});
			},
			fail: (error)=>{
				reject(error);
			}
		});
	})
}
