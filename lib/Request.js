export default class Request {
	constructor(){
		this.count = 0;
	}
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
		}, (request)=>{
			const options = {
				...params,
				success: (res) => {
					this.afterRequest({
						response: res,
						request: {
							url,
							method,
							header,
							data,
							success,
							fail,
							isMock,
							isSuccess
						}
					},(response)=>{
						const { data } = res;
						success(data);
					});
				},
				fail: (error) => {
					this.afterRequest(error,(error)=>{
						fail(error.errMsg);
					});
				}
			};
			wx.request(options);
		});
	}
};
