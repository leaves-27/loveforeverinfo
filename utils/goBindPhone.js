import router from "../router";

export default (inviteCode = '')=>{
	router.redirectTo({
		url: `/pages/authorize-phone/authorize-phone?inviteCode=${inviteCode}`
	});
}
