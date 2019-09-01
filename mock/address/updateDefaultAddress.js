import {request} from "../../utils/util";

export default ({
  addressId = ''
})=>{
	return new Promise( (resolve, reject)=>{
		request({
			isMock: true,
			url: '',
			data: {
				addressId
			},
			success: (res)=>{
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
