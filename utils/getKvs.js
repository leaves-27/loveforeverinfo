/**
 * 生成键值对渲染数据列表。类似:[{ key: '手机号', value: '13854152631' }]
 * */
export default (ORDER = {}, order = {}) => {
	const kvs = [];
	Object.keys(ORDER).forEach((item)=>{
		if(item.indexOf('_') > -1){
			const keys = item.split('_');
			kvs.push({
				key: ORDER[item],
				value: order[keys[0]][keys[1]]
			});
		} else {
			kvs.push({
				key: ORDER[item],
				value: order[item]
			})
		};
	});
	return kvs;
};
