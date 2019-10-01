import UserRole from '../role';

export default [{
	path: "/pages/index/index"
}, {
	path: '/pages/order-confirm/order-confirm'
}, {
	path: '/pages/create-address/address'
}, {
	path: '/pages/points-addresses/address'
}, {
	path: '/pages/my/my',
	role: [UserRole['customer']]
}, {
	path: '/pages/my-address/my-address',
	role: [UserRole['customer']]
}, {
	path: '/pages/my-order/my-order',
	role: [UserRole['customer']]
}, {
	path: '/pages/order-detail/order-detail',
	role: [UserRole['customer']]
}, {
	path: '/pages/order-result/order-result',
	role: [UserRole['customer']]
}]
