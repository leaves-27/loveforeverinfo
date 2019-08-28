import {request} from "../../utils/util";

export default ({
    name = '',
    phone = '',
    desc = 1
  })=>{
	return new Promise( (resolve, reject)=>{
		request({
			isMock: true,
			url: '',
			data: {},
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
