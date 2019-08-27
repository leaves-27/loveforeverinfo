import {request} from "../../utils/util";

export default ({
  addressId = ''
})=>{
	return new Promise( (resolve, reject)=>{
		request({
			isMock: true,
			url: '',
			data: {
				pointId
			},
			success: (res)=>{
				// resolve(res);
				resolve({
					code: 1,
					data: true
				});
			},
			fail: (error)=>{
				reject(error);
			}
		});
	})
};
