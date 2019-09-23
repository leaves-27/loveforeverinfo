import {request} from "../../utils/util";
import { apiPrefix } from "../../config/index";

export default (type)=>{
	return new Promise((resolve, reject)=>{
		request.request({
			// isMock: true,
			// isSuccess: true,
			url: `${apiPrefix}/account/getConsumerOrderFlow`,
			data: {
				type
			},
			method: 'post',
			success: (res)=>{
				resolve(res);
				// resolve({
				// 	"code": "1",
				// 	"data": [
				// 		{
				// 			"date": "日期",
				// 			"amount": "合计金额",
				// 			"count": "商品数量",
				// 			"good": {
				// 				"id": "",
				// 				"name": "",
				// 				"logoUrl": "",
				// 				"price": ""
				// 			}
				// 		}
				// 	]
				// })
			},
			fail: (error)=>{
				reject(error);
			}
		});
	})
}
