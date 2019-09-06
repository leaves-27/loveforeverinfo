/**
 * 生成键值对渲染数据列表。类似:[{ key: '手机号', value: '13854152631' }]
 * */
export default (ORDER, order) => {
	const kvs = [];
	Object.keys(order).forEach((item) => {
		if(typeof order[item] === 'object'){
			Object.keys(order[item]).forEach((subItem)=>{
				if (ORDER[`${item}_${subItem}`]){
					kvs.push({
						key: ORDER[`${item}_${subItem}`],
						value: order[item][subItem]
					});
				}
			});
		} else if (ORDER[item]){
			kvs.push({
				key: ORDER[item],
				value: order[item]
			})
		}
	});
	return kvs;
};
