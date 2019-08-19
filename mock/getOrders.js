import { placeholderUrl } from '../utils/util';

export default ()=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: [{
				"user": {
					"id": "消费者Id",
					"name": "张小毛",
					"phone": "消费者手机号"
				},
				"good": {
					"id": "001",
					"name": "喜燕周年装",
					"logoUrl": placeholderUrl,
					"price": "380.88"
				},
				"delivery": {
					"id": "配送单Id",
					"wayId": "配送方式id",
					"name": "派送员名称",
					"phone": "派送员手机",
					"address": "配送地址",
					"fee": "配送费"
				},
				"orderCode": "订单编号",
				"createTime": "2019-6-17  12:00:12",
				"payTime": "订单支付时间",
				"deliveryStartTime": "配送开始时间",
				"deliveryEndTime": "配送结束时间",
				"receiveTime": "签收时间",
				"payWayId": "支付方式id",
				"status": "订单状态",
				"count": 1
			}, {
				"user": {
					"id": "消费者Id",
					"name": "张小毛",
					"phone": "消费者手机号"
				},
				"good": {
					"id": "001",
					"name": "喜燕周年装",
					"logoUrl": placeholderUrl,
					"price": "380.88"
				},
				"delivery": {
					"id": "配送单Id",
					"wayId": "配送方式id",
					"name": "派送员名称",
					"phone": "派送员手机",
					"address": "配送地址",
					"fee": "配送费"
				},
				"orderCode": "订单编号",
				"createTime": "2019-6-17  12:00:12",
				"payTime": "订单支付时间",
				"deliveryStartTime": "配送开始时间",
				"deliveryEndTime": "配送结束时间",
				"receiveTime": "签收时间",
				"payWayId": "支付方式id",
				"status": "订单状态",
				"count": 1
			}]
		})
	}, 1000);
});
