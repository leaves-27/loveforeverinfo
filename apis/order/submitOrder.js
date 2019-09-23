import {placeholderUrl } from "../../utils/util";
import { apiPrefix } from "../../config/index";
import request from "../../request";

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
		url: `${apiPrefix}/order/submitOrder`,
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
