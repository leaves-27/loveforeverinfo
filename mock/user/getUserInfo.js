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
					name: '疯趣的二师兄',
					phone: '135****8888',
					score: 200000,
					userLogoUrl: placeholderUrl,
					addressIconUrl: placeholderUrl
				}
			});
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
