export default ({
	goodId,
	count = '',
  deliveryWayId = '',
	payWayId = ''
})=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: {
				payId: '',
				signedWay: '',
				signed: '',
				r: '',
				timestamp: '',
			}
		})
	}, 1000);
});
