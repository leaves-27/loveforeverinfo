import { staticPrifix} from '../config/index';
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
		iconUrl: `${staticPrifix}/all.png`
	},{
		id: OrderStatus['waitPay'],
		name: '待付款',
		iconUrl: `${staticPrifix}/waitpay.png`
	}, {
		id: OrderStatus['deliverying'],
		name: '配送中',
		iconUrl: `${staticPrifix}/deliverying.png`
	}, {
		id: OrderStatus['reviced'],
		name: '已签收',
		iconUrl: `${staticPrifix}/signed.png`
	}]
};