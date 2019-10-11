export default ()=>{
	return new Promise((resolve, reject)=>{
		wx.login({
			timeout: 1000 * 60,
			success (res) {
				const { code, errMsg } = res;
				if (code) {
					resolve(code);
				} else {
					reject(errMsg);
				}
			},
			fail(error){
				const { errMsg = '' } = error;
				reject(errMsg);
			}
		})
	})
}
