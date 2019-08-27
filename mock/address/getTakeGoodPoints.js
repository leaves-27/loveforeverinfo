import {request} from "../../utils/util";

export default ()=> new Promise( (resolve, reject)=>{
	request({
		isMock: true,
		url: '',
		data: {},
		success: (res)=>{
			// resolve(res);
			resolve({
				code: 1,
				data: [{
					id: '01',
					name: '提货点1',
					address: '浙江省杭州市古荡街道110号',
				}, {
					id: '02',
					name: '赵四 188****2773',
					address: '浙江省杭州市古荡街道110号',
				}]
			})
		},
		fail: (error)=>{
			reject(error);
		}
	});
});