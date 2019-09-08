import {request} from "../../utils/util";

export default (id)=>{
	return new Promise(async (resolve, reject)=>{
		request.request({
			isMock: true,
			isSuccess: true,
			url: '',
			data: {
				id
			},
			success: (res)=>{
				// resolve(res);
				resolve({
					code: 1,
					data: [{
						id: '01',
						name: "快递配送",
					}, {
						id: '02',
						name: "自提",
					}]
				})
			},
			fail: (error)=>{
				reject(error);
			}
		});
	})
}
