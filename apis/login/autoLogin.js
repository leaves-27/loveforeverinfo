import getTempCredentials from "./getTempCredentials";
import { loginByWxTempCode } from "./login";

export default ()=>{ //
	return getTempCredentials().then(loginByWxTempCode).then((result)=>{
		const { code, data } = result;
		if(code * 1 !== 1){
			wx.showToast({
				icon: 'none',
				title: '自动登录失败，请稍后重新进入'
			});
		}
		return data;
	}).catch((error)=>{
		wx.showToast({
			icon: 'none',
			title: '自动登录失败，请稍后重新进入'
		});
		console.error('error:', error);
	})
}
