import router from "../router";

export default (inviteCode = '')=>{
	router.redirectTo({
		url: `/pages/bind-phone/bind-phone?inviteCode=${inviteCode}`
	});
}
