import UserRole from './userRole';

export const Route = {
	redirect: '/pages/login/login',
	routes: [{
		path: "pages/index/index",
		role: [UserRole['customer']]
	}, {
		path: 'pages/my/my',
		role: [UserRole['customer']]
	}, {
		path: 'pages/my-order/my-order',
		role: [UserRole['customer']]
	}, {
		path: 'pages/my/my',
		role: [UserRole['customer']]
	}, {
		path: 'pages/my/my',
		role: [UserRole['customer']]
	}, {
		path: 'pages/my/my',
		role: [UserRole['customer']]
	}, {
		path: 'pages/my/my',
		role: [UserRole['customer']]
	}, {
		path: 'pages/my/my',
		role: [UserRole['customer']]
	}, {
		path: 'pages/my/my',
		role: [UserRole['customer']]
	}, {
		path: 'pages/my/my',
		role: [UserRole['customer']]
	}, {
		path: 'pages/my/my',
		role: [UserRole['customer']]
	}, {
		path: 'pages/my/my',
		role: [UserRole['customer']]
	}, {
		path: 'pages/my/my',
		role: [UserRole['customer']]
	}, {
		path: 'pages/my/my',
		role: [UserRole['customer']]
	}]
};

// "pages/index/index",
// 	"pages/order-confirm/order-confirm",
// 	"pages/order-result/order-result",

// 	"pages/my/my",
// 	"pages/my-order/my-order",
// 	"pages/order-detail/order-detail",
// 	"pages/login/login",
// 	"pages/create-address/address",
// 	"pages/my-address/my-address",


// 	"pages/doctor/doctor",
// 	"pages/medical-home/home",
// 	"pages/medical-doctor-detail/doctor-detail",
// 	"pages/medical-my-order/my-order",
// 	"pages/medical-my-qr/my-qr",
// 	"pages/medical-order-detail/order-detail",
// 	"pages/medical-order-progress/order-progress",
// 	"pages/bind-phone/bind-phone"
