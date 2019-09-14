import router from './router';
import UserRole from './userRole';

export default function(userRole){
	if (`${userRole}` === UserRole['customer']){ // 消费者
		router.navigateTo({
			url: `/pages/index/index`
		});
	} else if(`${userRole}` === UserRole['doctor']){ // 医生
		router.navigateTo({
			url: `/pages/doctor/doctor`
		})
	} else if (`${userRole}` === UserRole['medical']){// 医药代表
		router.navigateTo({
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
