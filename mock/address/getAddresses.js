import {request} from "../../utils/util";

export default ()=> new Promise( (resolve, reject)=>{
	request.request({
		isMock: true,
		url: '',
		data: {},
		success: (res)=>{
			// resolve(res);
			resolve({
				code: 1,
				data: [{
					id: '001',
					name: '赵四',
					phone: '18076861167',
					address: '浙江杭州市滨江区中控科技园E幢22楼'
				}, {
					id: '002',
					name: '赵四',
					phone: '18076861167',
					address: '浙江杭州市滨江区中控科技园E幢22楼'
				}]
			})
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
