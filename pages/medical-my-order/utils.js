import { getKvs, OrderStatus } from "../../utils/util";

export const getOrderCategoryByIsFinish = (orders)=>{
	// 订单状态有:已下单、已支付、已确认、开始配送、配送中、已签收

	const unFinishOrders = []; // 已支付、已确认  todos
	const finishOrders = []; // 开始配送、已签收  todos

	orders.forEach((item)=>{
		if(item.status === OrderStatus['startDelivery'] || item.status === OrderStatus['reviced']){
			const ORDER = {
				user_name: '客户姓名',
				user_phone: '联系方式'
			};

			finishOrders.push({
				...item,
				kvs: getKvs(ORDER, item).map((item)=>{

				})
			});
		} else if(item.status === OrderStatus['payed'] || item.status === OrderStatus['confirmedOrder']){
			const ORDER = {
				user_name: '客户姓名',
				user_phone: '联系方式',
				createTime: '创建时间',
				orderCode : '订单编号',
				delivery_address: '配送地址',
			};
			unFinishOrders.push({
				...item,
				kvs: getKvs(ORDER, item).map((item)=>{
					let value;
					if(item.key === ORDER['delivery_address']){
						value = item.value.replace(/\s/g, '');
					} else {
						value = item.value;
					}
					return {
						key: item.key,
						value
					}
				})
			});
		}
	});

	return {
		unFinishOrders,
	  finishOrders,
	};
}
