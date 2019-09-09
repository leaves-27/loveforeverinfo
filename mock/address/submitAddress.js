import { request } from "../../utils/util";

export default ({
    name = '',
    phone = '',
    desc = 1
  })=>{
	return new Promise( (resolve, reject)=>{
		request.request({
			isMock: false,
			url: '',
			data: {},
			success: (res)=>{
				// resolve(res);
				resolve({
					code: 1,
					data: {
						addressId: '000001'
					}
				});
			},
			fail: (error)=>{
				reject(error);
			}
		});
	})
};
