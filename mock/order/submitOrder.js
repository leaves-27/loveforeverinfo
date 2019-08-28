import {placeholderUrl, request} from "../../utils/util";

export default ({
	goodId,
	count = '',
  deliveryWayId = '',
	payWayId = ''
})=> new Promise( (resolve, reject)=>{
	request({
		isMock: true,
		url: '',
		data: {
			goodId,
			count,
			deliveryWayId,
			payWayId
		},
		success: (res)=>{
			// resolve(res);
			resolve({
				code: 1,
				data: {
					payId: '',
					signedWay: '',
					signed: '',
					r: '',
					timestamp: '',
				}
			})
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
