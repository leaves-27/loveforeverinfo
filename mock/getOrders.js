import { placeholderUrl } from '../utils/util';

export default ()=> new Promise( (resolve, reject)=>{

	// status:
	// 1: 待支付
	// 2: 已支付
	// 3: 确认订单
	// 4: 开始配送
	// 5: 配送中
	// 6: 已签收

	setTimeout(()=>{
		resolve({
			code: 1,
			data: [{
				"user": {
					"id": "000000111111",
					"name": "张小毛",
					"phone": "17765321121"
				},
				"good": {
					"id": "001",
					"name": "喜燕周年装",
					"logoUrl": placeholderUrl,
					"price": "380.88"
				},
				"delivery": {
					"id": "0000000001",
					"wayId": "1",
					"name": "李师傅",
					"phone": "1555321124",
					"address": "浙江杭州市江干区明月桥路38号",
					"fee": "8.12"
				},
				"orderCode": "243543657578698898986571",
				"createTime": "2019-6-17  12:00:12",
				"payTime": "2019-6-17  12:00:12",
				"deliveryStartTime": "2019-6-17  12:00:12",
				"deliveryEndTime": "2019-6-17  12:00:12",
				"receiveTime": "2019-6-17  12:00:12",
				"payWayId": "2",
				"status": "2", // 已支付
				"count": 1,
				"deliveryStatus": "2"
			}, {
				"user": {
					"id": "000000111111",
					"name": "张小毛",
					"phone": "17765321121"
				},
				"good": {
					"id": "001",
					"name": "喜燕周年装",
					"logoUrl": placeholderUrl,
					"price": "380.88"
				},
				"delivery": {
					"id": "0000000001",
					"wayId": "1",
					"name": "李师傅",
					"phone": "1555321124",
					"address": "浙江杭州市江干区明月桥路38号",
					"fee": "8.12"
				},
				"orderCode": "243543657578698898986578",
				"createTime": "2019-6-17  12:00:12",
				"payTime": "2019-6-17  12:00:12",
				"deliveryStartTime": "2019-6-17  12:00:12",
				"deliveryEndTime": "2019-6-17  12:00:12",
				"receiveTime": "2019-6-17  12:00:12",
				"payWayId": "1",
				"status": "3", // 已确认
				"count": 1,
				"deliveryStatus": "1"
			}, {
				"user": {
					"id": "000000111111",
					"name": "张小毛",
					"phone": "17765321121"
				},
				"good": {
					"id": "001",
					"name": "喜燕周年装",
					"logoUrl": placeholderUrl,
					"price": "380.88"
				},
				"delivery": {
					"id": "0000000001",
					"wayId": "1",
					"name": "李师傅",
					"phone": "1555321124",
					"address": "浙江杭州市江干区明月桥路38号",
					"fee": "8.12"
				},
				"orderCode": "243543657578698898986578",
				"createTime": "2019-6-17  12:00:12",
				"payTime": "2019-6-17  12:00:12",
				"deliveryStartTime": "2019-6-17  12:00:12",
				"deliveryEndTime": "2019-6-17  12:00:12",
				"receiveTime": "2019-6-17  12:00:12",
				"payWayId": "1",
				"status": "4", // 开始配送
				"count": 1,
				"deliveryStatus": "1"
			}]
		})
	}, 1000);
});
