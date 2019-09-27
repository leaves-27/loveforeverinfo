import { placeholderUrl } from '../../utils/util';
import { apiPrefix } from "../../config/index";
import request from "../../request";

// import UserRole from "../../utils/userRole";
//
// const getMock = (phone)=>{
// 	const arr = [{
// 		"token": "ae111",
// 		"uid": "1006",
// 		"phone":"15800001111",
// 		"type": "consumer"
// 	},
// 		{
// 			"token": "ae222",
// 			"uid": "1007",
// 			"phone":"15857106968",
// 			"type": "specialist"
// 		},
// 		{
// 			"token": "ae333",
// 			"uid": "1008",
// 			"phone":"15800001113",
// 			"type": "comissioner"
// 		},
// 		{
// 			"token": "ae444",
// 			"uid": "1009",
// 			"phone":"15800001114",
// 			"type": "deliverer"
// 		}];
// 	const code = 1;
//
// 	if (phone === "18857152332"){ //专员
// 		return {
// 			code,
// 			data: arr[2]
// 		};
// 	} else if(phone === "18857152331"){ // 专家
// 		return {
// 			code,
// 			data: arr[1]
// 		};
// 	} else {
// 		return {
// 			code,
// 			data: arr[0]
// 		};
// 	}
// };

export const bindPhoneByWx = ({ detail })=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrefix}/account/bindPhoneByWx`,
		data: {
			detail
		},
		method: 'post',
		success: (res)=>{
			resolve(res);
			// resolve(getMock(phone))
		},
		fail: (error)=>{
			reject(error);
		}
	});
});

export default ({ phone, validationCode })=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrefix}/account/bindphone`,
		data: {
			phone,
			validationCode
		},
		method: 'post',
		success: (res)=>{
			resolve(res);
			// resolve(getMock(phone))
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
