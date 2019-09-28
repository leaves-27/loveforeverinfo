import { apiPrefix } from "../../config/index";
import request from "../../request";

export default ({
	goodId,
	count = '',
  deliveryWayId = '',
	payWayId = '',
  receiveAddressId = '',
  memo = '',
	inviteCode = '',
  featureId = ''
})=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrefix}/order/submitOrder`,
		method: 'post',
		data: {
			goodId,
			count,
			deliveryWayId,
			payWayId,
			receiveAddressId,
			memo,
			mgCode: inviteCode,
			featureId
		},
		success: (res)=>{
			resolve(res);
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
