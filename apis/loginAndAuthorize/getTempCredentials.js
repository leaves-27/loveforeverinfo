export default ()=>{
	return new Promise(async (resolve, reject)=>{
		wx.login({
			success (res) {
				console.log('res:', res);
				if (res.code) {
					resolve(res.code);
				} else {
					reject(res.errMsg);
				}
			}
		})
	})
}
