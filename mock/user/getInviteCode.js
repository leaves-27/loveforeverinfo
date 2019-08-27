import { placeholderUrl, request } from '../../utils/util';

export default ()=> new Promise( (resolve, reject)=>{
	request({
		isMock: true,
		url: '',
		success: (res)=>{
			// resolve(res);
			resolve({
				code: 1,
				data: {
					inviteCode: 'xxxxxx',
				}
			})
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
