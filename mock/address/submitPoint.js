import {request} from "../../utils/util";

export default ({
  pointId = ''
})=>{
	return new Promise( (resolve, reject)=>{
		request.request({
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
