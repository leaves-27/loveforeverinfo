import {placeholderUrl, request} from "../../utils/util";

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
