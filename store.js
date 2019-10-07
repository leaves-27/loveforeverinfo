// const Store = {
// 	get(){
// 		return JSON.parse(wx.getStorageSync('store') || '{}');
// 	},
// 	update(store = {}){
// 		const oldStore = JSON.parse(wx.getStorageSync('store') || '{}');
// 		const newStore = Object.assign({}, oldStore, {
// 			...store
// 		});
// 		wx.setStorageSync('store', JSON.stringify(newStore));
// 	}
// };

// 订阅即初始化state.发布即修改

// import Subscriber from './subscriber'
//
// const subscriber = new Subscriber();
// export default ()=>{
// 	const store = {
// 		state: {
// 			userRole: '',
// 			token: ''
// 		},
// 		mutations: {},
// 		actions: {
// 			get(key){
// 				const store = Store.get();
// 				return store[key];
// 			},
// 			updateRoleAndToken({
// 				role = '',
// 				token = ''
// 			}){
// 				Store.update({
// 					role,
// 					token
// 				});
// 			}
// 		}
// 	};
//
// 	Object.observe(store.state, function(changes){
// 		changes.forEach((item)=>{
//
// 		})
// 	});
// 	return store
// }
