export default ({
		orderId = '',
    timeStamp = '',
    nonceStr = '',
	  packageStr = '',
    paySign = '',
    signType = 'MD5',
})=>{
	return new Promise((resolve, reject)=>{
		wx.requestPayment({
			timeStamp,
			nonceStr,
			package: packageStr,
			paySign,
			signType,
			success (res) {
				resolve({
					code: 1,
					data: {
						orderId
					}
				});
			},
			fail (error) {
				const { errMsg = '' } = error;
				reject({
					orderId,
					errMsg,
				});
			}
		})
	})
}
