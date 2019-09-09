export default class Router {
	constructor(){}
	beforeRequest(request, next){
		next(request);
	}
	afterRequest(response, next){
		next(response);
	}
	request({
    url = '',
    method = 'get',
    header = {},
		data = {},
    success = ()=>{},
    fail = ()=>{},
    isMock = false,
    isSuccess = false
  }){
		const token = wx.getStorageSync('token');
		const params = {
			url,
			method,
			header: {
				'content-type': 'application/json',
				'token': token,
				...header
			},
			data
		};

		this.beforeRequest({
			...params,
			success,
			fail,
			isMock,
			isSuccess,
		}, ()=>{
			wx.request({
				...params,
				success: (res) => {
					const { data } = res || {};
					this.afterRequest(data,(res)=>{
						success(data);
					});
				},
				fail: (error) => {
					this.afterRequest(error,(error)=>{
						fail(error.errMsg);
					});
				}
			});
		});
	}
};
