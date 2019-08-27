export default (scope)=>{ // scope的值有：userInfo、userLocation、werun、writePhotosAlbum
	return new Promise(async (resolve, reject)=>{
		wx.authorize({
			scope: `scope.${scope}`,
			success (res) {
				resolve(res)
			},
			fail(error){
				reject(error);
			}
		})
	})
}
