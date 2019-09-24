import request from "../../request";
import {apiPrefix} from "../../config/index";

export default ({
  addressId = ''
})=>{
	return new Promise( (resolve, reject)=>{
		request.request({
			// isMock: true,
			// isSuccess: true,
			url: `${apiPrefix}/delivery/setUserDefaultAddress`,
			method: 'post',
			data: {
				addressId
			},
			success: (res)=>{
				resolve(res);
				// resolve({
				// 	code: 1,
				// 	data: true
				// });
			},
			fail: (error)=>{
				reject(error);
			}
		});
	})
};
