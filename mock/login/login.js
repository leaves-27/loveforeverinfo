import { request } from '../../utils/util'
export default ({ phone, validationCode })=> new Promise( (resolve, reject)=>{
	request({
		isMock: true,
		url: '',
		data: {
			phone,
			validationCode
		},
		success: (res)=>{
			// resolve(res);
			const userType = phone === "18857152332" ? 1 : 2;
			resolve({
				code: 1,
				data: {
					token: `xxxxxxx_${phone}_xxxxxxx`,
					userType
				}
			})
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
