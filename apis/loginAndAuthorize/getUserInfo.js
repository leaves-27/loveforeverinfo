export default ()=>{
	return new Promise(async (resolve, reject)=>{
		wx.getUserInfo({
			success: res => {
				resolve(res)
			},
			fail(error){
				reject(error);
			}
		})
	})
}


