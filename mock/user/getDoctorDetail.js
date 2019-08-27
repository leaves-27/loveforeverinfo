import { placeholderUrl, request } from '../../utils/util';

export default (id)=> new Promise( (resolve, reject)=>{
	request({
		isMock: true,
		url: '',
		data: {
			id
		},
		success: (res)=>{
			// resolve(res);
			resolve({
				code: 1,
				data: {
					name: '张医生',
					phone: '1873327891',
					logoUrl: placeholderUrl,
					hospital: '市妇女儿童医院',
					department: '妇产科',
					userCount: 100,
					level: '主任医师',
					score: 80
				}
			})
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
