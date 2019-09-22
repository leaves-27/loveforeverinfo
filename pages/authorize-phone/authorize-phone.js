import { goUserHome } from '../../utils/util.js';
import { bindPhoneByWxBindPhone } from '../../apis/user/bindPhone';

Page({
	bindPhone($event){
		const { detail, errMsg = '' } = $event;
		if (errMsg){
			wx.showToast({
				icon:'none',
				title: errMsg
			});
			return ;
		};

		bindPhoneByWxBindPhone({
			detail: detail
		}).then((result)=>{
			const { code, data } = result;
			if(code * 1 !== 1){
				wx.showToast({
					icon: 'none',
					title: '绑定失败，请稍后重试'
				});
			} else {
				const { role = '' } = data;
				if (role){
					wx.showToast({
						title: '绑定成功'
					});
					wx.setStorageSync('userRole', role);
					setTimeout(()=>{
						goUserHome(role);
					}, 1000);
				} else {
					wx.showToast({
						title: '绑定失败'
					});
				}
			}
		}).catch((error)=>{
			wx.showToast({
				icon: 'none',
				title: '登录失败，请稍后重试'
			});
		});
	},
	onLoad: function () {}
});
