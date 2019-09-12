import {placeholderUrl, request} from '../../utils/util';
import { apiPrifix } from "../../config/index";

export default ()=> new Promise( (resolve, reject)=>{

	// status:
	// 1: 待支付
	// 2: 已支付
	// 3: 确认订单
	// 4: 开始配送
	// 5: 配送中
	// 6: 已签收
	request.request({
		// isMock: false,
		// isSuccess: false,
		url: `${apiPrifix}/order/getOrders`,
		method: 'get',
		data: {},
		success: (res)=>{
			resolve(res);
			// resolve({
			// 	code: 1,
			// 	data: [{
			// 		"user": {
			// 			"id": "000000111112",
			// 			"name": "张小毛",
			// 			"phone": "17765321121"
			// 		},
			// 		"good": {
			// 			"id": "001",
			// 			"name": "喜燕周年装",
			// 			"logoUrl": placeholderUrl,
			// 			"price": "380.88"
			// 		},
			// 		"delivery": {
			// 			"id": "0000000001",
			// 			"wayId": "1",
			// 			"name": "李师傅",
			// 			"phone": "1555321124",
			// 			"address": "浙江杭州市江干区明月桥路38号",
			// 			"fee": "8.12",
			// 			"startTime": "2019-6-17  12:00:12",
			// 			"endTime": "2019-6-17  12:00:12",
			// 		},
			// 		"pay": {
			// 			"wayId": "2",
			// 			"payTime": "2019-6-17  12:00:12",
			// 		},
			// 		"orderCode": "243543657578698898986571",
			// 		"createTime": "2019-6-17  12:00:12",
			// 		"confirmTime": "2019-6-17  12:00:12",
			// 		"receiveTime": "2019-6-17  12:00:12",
			// 		"status": "1", //
			// 		"count": 1,
			// 	}, {
			// 		"user": {
			// 			"id": "000000111112",
			// 			"name": "张小毛",
			// 			"phone": "17765321121"
			// 		},
			// 		"good": {
			// 			"id": "001",
			// 			"name": "喜燕周年装",
			// 			"logoUrl": placeholderUrl,
			// 			"price": "380.98"
			// 		},
			// 		"delivery": {
			// 			"id": "0000000001",
			// 			"wayId": "1",
			// 			"name": "李师傅",
			// 			"phone": "1555321124",
			// 			"address": "浙江杭州市江干区明月桥路38号",
			// 			"fee": "8.12",
			// 			"startTime": "2019-6-17  12:00:12",
			// 			"endTime": "2019-6-17  12:00:12",
			// 		},
			// 		"pay": {
			// 			"wayId": "2",
			// 			"payTime": "2019-6-17  12:00:12",
			// 		},
			// 		"orderCode": "243543657578698898986572",
			// 		"createTime": "2019-6-17  12:00:12",
			// 		"confirmTime": "2019-6-17  12:00:12",
			// 		"receiveTime": "2019-6-17  12:00:12",
			// 		"status": "2", //
			// 		"count": 1,
			// 	}, {
			// 		"user": {
			// 			"id": "000000111112",
			// 			"name": "张小毛",
			// 			"phone": "17765321121"
			// 		},
			// 		"good": {
			// 			"id": "001",
			// 			"name": "喜燕周年装",
			// 			"logoUrl": placeholderUrl,
			// 			"price": "380.48"
			// 		},
			// 		"delivery": {
			// 			"id": "0000000001",
			// 			"wayId": "1",
			// 			"name": "李师傅",
			// 			"phone": "1555321124",
			// 			"address": "浙江杭州市江干区明月桥路38号",
			// 			"fee": "8.12",
			// 			"startTime": "2019-6-17  12:00:12",
			// 			"endTime": "2019-6-17  12:00:12",
			// 		},
			// 		"pay": {
			// 			"wayId": "2",
			// 			"payTime": "2019-6-17  12:00:12",
			// 		},
			// 		"orderCode": "243543657578698898986573",
			// 		"createTime": "2019-6-17  12:00:12",
			// 		"confirmTime": "2019-6-17  12:00:12",
			// 		"receiveTime": "2019-6-17  12:00:12",
			// 		"status": "3", //
			// 		"count": 1,
			// 	}, {
			// 		"user": {
			// 			"id": "000000111112",
			// 			"name": "张小毛",
			// 			"phone": "17765321121"
			// 		},
			// 		"good": {
			// 			"id": "001",
			// 			"name": "喜燕周年装",
			// 			"logoUrl": placeholderUrl,
			// 			"price": "380.18"
			// 		},
			// 		"delivery": {
			// 			"id": "0000000001",
			// 			"wayId": "1",
			// 			"name": "李师傅",
			// 			"phone": "1555321124",
			// 			"address": "浙江杭州市江干区明月桥路38号",
			// 			"fee": "8.12",
			// 			"startTime": "2019-6-17  12:00:12",
			// 			"endTime": "2019-6-17  12:00:12",
			// 		},
			// 		"pay": {
			// 			"wayId": "2",
			// 			"payTime": "2019-6-17  12:00:12",
			// 		},
			// 		"orderCode": "243543657578698898986574",
			// 		"createTime": "2019-6-17  12:00:12",
			// 		"confirmTime": "2019-6-17  12:00:12",
			// 		"receiveTime": "2019-6-17  12:00:12",
			// 		"status": "4",
			// 		"count": 1,
			// 	}, {
			// 		"user": {
			// 			"id": "000000111112",
			// 			"name": "张小毛",
			// 			"phone": "17765321121"
			// 		},
			// 		"good": {
			// 			"id": "001",
			// 			"name": "喜燕周年装",
			// 			"logoUrl": placeholderUrl,
			// 			"price": "380.18"
			// 		},
			// 		"delivery": {
			// 			"id": "0000000001",
			// 			"wayId": "1",
			// 			"name": "李师傅",
			// 			"phone": "1555321124",
			// 			"address": "浙江杭州市江干区明月桥路38号",
			// 			"fee": "8.12",
			// 			"startTime": "2019-6-17  12:00:12",
			// 			"endTime": "2019-6-17  12:00:12",
			// 		},
			// 		"pay": {
			// 			"wayId": "2",
			// 			"payTime": "2019-6-17  12:00:12",
			// 		},
			// 		"orderCode": "243543657578698898986575",
			// 		"createTime": "2019-6-17  12:00:12",
			// 		"confirmTime": "2019-6-17  12:00:12",
			// 		"receiveTime": "2019-6-17  12:00:12",
			// 		"status": "5",
			// 		"count": 1,
			// 	}, {
			// 		"user": {
			// 			"id": "000000111112",
			// 			"name": "张小毛",
			// 			"phone": "17765321121"
			// 		},
			// 		"good": {
			// 			"id": "001",
			// 			"name": "喜燕周年装",
			// 			"logoUrl": placeholderUrl,
			// 			"price": "380.18"
			// 		},
			// 		"delivery": {
			// 			"id": "0000000001",
			// 			"wayId": "1",
			// 			"name": "李师傅",
			// 			"phone": "1555321124",
			// 			"address": "浙江杭州市江干区明月桥路38号",
			// 			"fee": "8.12",
			// 			"startTime": "2019-6-17  12:00:12",
			// 			"endTime": "2019-6-17  12:00:12",
			// 		},
			// 		"pay": {
			// 			"wayId": "2",
			// 			"payTime": "2019-6-17  12:00:12",
			// 		},
			// 		"orderCode": "243543657578698898986576",
			// 		"createTime": "2019-6-17  12:00:12",
			// 		"confirmTime": "2019-6-17  12:00:12",
			// 		"receiveTime": "2019-6-17  12:00:12",
			// 		"status": "6",
			// 		"count": 1,
			// 	}]
			// })
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
