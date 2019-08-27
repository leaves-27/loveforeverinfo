import {request} from "../../utils/util";

export default (address)=> new Promise( (resolve, reject)=>{
	request({
		isMock: true,
		url: '',
		data: {
			address,
		},
		success: (res)=>{
			// resolve(res);
			resolve({
				code: 1,
				data: {
					id: ''
				}
			})
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
