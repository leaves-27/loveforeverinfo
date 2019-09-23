import request from "../../request";

export default ({
  addressId = ''
})=>{
	return new Promise( (resolve, reject)=>{
		request.request({
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
