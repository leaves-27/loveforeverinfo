import { request } from '../utils/util';
export default ()=> new Promise( (resolve, reject)=>{
	request({
		isMock: true,
		url: '',
		method: 'get',
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
});
