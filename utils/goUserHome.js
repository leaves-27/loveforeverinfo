import router from '../router';
import UserRole from '../role';

export default function(userRole){
	if (`${userRole}` === UserRole['customer']){ // 消费者
		router.reLaunch({
			url: `/pages/index/index`
		});
	} else if(`${userRole}` === UserRole['doctor']){ // 专家
		router.reLaunch({
			url: `/pages/doctor/doctor`
		})
	} else if (`${userRole}` === UserRole['medical']){// 专员
		router.reLaunch({
			url: `/pages/medical-home/home`
		});
	} else if (`${userRole}` === UserRole['courier']){ // 派送员
		// 暂无
	} else { // 没权限，则去自动登录获取权限
		// router.navigateTo({
		// 	url: `/pages/bind-phone/bind-phone`
		// });
	}
};
