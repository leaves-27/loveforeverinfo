export default class Router {
	constructor(route){
		this.route = route;
	}
	beforeCreate(url, next){
		next();
	}

	afterCreate(next){
		next();
	}

	navigateTo({ url, success = ()=>{} }){
		this.beforeCreate(url, ()=>{
			console.log('================router:');
			console.log('================url:', url);
			// wx.navigateTo({
			// 	url,
			// 	success: ()=>{
			// 		this.afterCreate(success);
			// 	}
			// });
			// wx.navigateTo({
			// 	url: '/pages/index/index'
			// });
			wx.navigateTo({
				url,
				success(){
					console.log('=========navigateTo success:');
				}
			});
		});
	}
};
