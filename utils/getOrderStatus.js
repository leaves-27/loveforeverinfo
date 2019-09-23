import { staticPrefix} from '../config/index';
import OrderStatus from './OrderStatus';

/**
 * 1: 待支付
 * 2: 已支付
 * 3: 确认订单
 * 4: 开始配送
 * 5: 配送中
 * 6: 已签收
 * */
export default ()=>{
	return [{
		id: OrderStatus['all'],
		name: '全部',
		iconUrl: `${staticPrefix}/all.png`
	},{
		id: OrderStatus['waitPay'],
		name: '待付款',
		iconUrl: `${staticPrefix}/waitpay.png`
	}, {
		id: OrderStatus['confirmedOrder'],
		name: '配送中',
		iconUrl: `${staticPrefix}/deliverying.png`
	}, {
		id: OrderStatus['received'],
		name: '已签收',
		iconUrl: `${staticPrefix}/signed.png`
	}]
};
