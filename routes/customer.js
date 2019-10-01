import UserRole from '../role';

export default [{
	path: "/pages/index/index"
}, {
	path: '/pages/order-confirm/order-confirm'
}, {
	path: '/pages/order-result/order-result',
	role: [UserRole['customer']]
}, {
	path: '/pages/my/my',
	role: [UserRole['customer']]
}, {
	path: '/pages/my-order/my-order',
	role: [UserRole['customer']]
}, {
	path: '/pages/order-detail/order-detail',
	role: [UserRole['customer']]
}, {
	path: '/pages/create-address/address',
	role: [UserRole['customer']]
}, {
	path: '/pages/my-address/my-address',
	role: [UserRole['customer']]
}, {
	path: '/pages/points-addresses/address',
	role: [UserRole['customer']]
}]
