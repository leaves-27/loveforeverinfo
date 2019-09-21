import {placeholderUrl, request} from "../../utils/util";
import { apiPrifix } from "../../config/index";

export default ({
	goodId,
	count = '',
  deliveryWayId = '',
	payWayId = '',
  receiveAddressId = '',
  memo = '',
	inviteCode = ''
})=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrifix}/order/submitOrder`,
		data: {
			goodId,
			count,
			deliveryWayId,
			payWayId,
			receiveAddressId,
			memo,
			mgCode: inviteCode
		},
		success: (res)=>{
			resolve(res);
			// resolve({
			// 	code: 1,
			// 	data: {
			// 		payId: '',
			// 		signedWay: '',
			// 		signed: '',
			// 		r: '',
			// 		timestamp: '',
			// 	}
			// })
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
