export default ()=>{
	console.log('test: code');
	return new Promise((resolve, reject)=>{
		wx.login({
			timeout: 1000 * 60,
			success (res) {
				const { code, errMsg } = res;
				if (code) {
					console.log('code==:: code');
					resolve(code);
				} else {
					reject(errMsg);
				}
			},
			fail(error){
				reject(errMsg);
			}
		})
	})
}
