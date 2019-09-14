import { placeholderUrl, request } from '../../utils/util';
import { apiPrifix } from "../../config/index";
import UserRole from "../../utils/userRole";

export default ({ phone, validationCode })=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrifix}/account/bindphone`,
		data: {
			phone,
			validationCode
		},
		method: 'post',
		success: (res)=>{
			// resolve(res);
			// resolve({
			// 	code: 1, //
			// 	data: null
			// })

			const arr = [{
				"token": "ae111",
				"uid": "1006",
				"phone":"15800001111",
				"type": "消费者"
			},
				{
					"token": "ae222",
					"uid": "1007",
					"phone":"15857106968",
					"type": "专家"
				},
				{
					"token": "ae333",
					"uid": "1008",
					"phone":"15800001113",
					"type": "专员"
				},
				{
					"token": "ae444",
					"uid": "1009",
					"phone":"15800001114",
					"type": "递送员"
				}];
			let data;
			if (phone === "18857152332"){ //医药代表
				data = arr[2]
			} else if(phone === "18857152331"){ // 医生
				data = arr[1]
			} else{
				data = arr[0]
			}

			resolve({
				code: 1, //
				data
			})
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
