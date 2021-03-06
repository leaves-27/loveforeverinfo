import UserRole from '../role';

export default [{
	path: "/pages/medical-home/home",
	role: [UserRole['medical']]
}, {
	path: '/pages/medical-doctor-detail/doctor-detail',
	role: [UserRole['medical']]
}, {
	path: '/pages/medical-my-order/my-order',
	role: [UserRole['medical']]
},{
	path: '/pages/medical-order-detail/order-detail',
	role: [UserRole['medical']]
}, {
	path: '/pages/medical-order-progress/order-progress',
	role: [UserRole['medical']]
}]
