import qs from "qs";

/**
 * 获取当前页面路由
 * */
export const getCurrentRoute = ()=>{
	let pages = getCurrentPages();
	let currPage = null;
	if (pages.length) {
		currPage = pages[pages.length - 1];
	}
	return currPage;
};

/**
 * 获取当前页面参数
 * */
export const getQuery = ()=>{
	const { options = {} } = getCurrentRoute() || {};
	const query = {};
	Object.keys(options).map((item)=>{
		if (/\$/.test(item)){
			query[`${item.slice(1)}`] = options[item];
		} else {
			query[`${item}`] = options[item];
		}
	});
	return query;
};

/**
 * 无刷新返回上个页面
 * */
export const navigateBack = (delta, keyValue)=>{
	const pages = getCurrentPages();
	const prevPage = pages[ pages.length - 1 - delta ];
	prevPage.setData(keyValue);
	wx.navigateBack({ delta });
};

const router = [];
/**
 * 请求拦截器
 * */
export const request = (options = {}) => {
	const {
		url = '',
		method,
		data,
		header,
		success = ()=>{},
		fail = ()=>{},
		isMock = false,
		isSuccess = true
	} = options;

	// 请求路径，根据什么来匹配是否需要登录
	const regExp = /api\/authorization/;

	console.log('test:', regExp.test(url));
	const token = wx.getStorageSync('token');
	if (regExp.test(url) && !token){ // 对需要登录的接口调用进行token是否有效判断.

		const { route = '' } = getCurrentRoute();
		const query = {
			url: `/${route}`
		};
		wx.navigateTo({
			url: `../login/login?$${qs.stringify(query, {encode: false })}`
		});
		return;
	}

	const params = Object.assign({
		url: '',
		method: 'get',
		data: {},
		header: {
			'content-type': 'application/json', // 默认值
			'token': token
		}
	}, {
		url,
		method,
		data,
		header
	});

	if (isMock){
		setTimeout(()=>{
			if (isSuccess){
				success({});
			} else {
				fail({});
			}
		}, 1000);
	} else {
		wx.request(Object.assign(params,{
			success (res) {
				console.log('request success：', res);
				success(res.data);
			},
			fail(error){
				console.log('request fail：', error);
				fail(error.errMsg);
			}
		}));
	}
};
