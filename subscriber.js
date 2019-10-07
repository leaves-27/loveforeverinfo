export default class {
	constructor(){
		this.topics = {};
		this.subUid = -1;
	}

	subscribe( topic, func ){
		if (!this.topics[topic]) {// 不存在初始化
			this.topics[topic] = [];
		}
		// 存在
		const token = ( ++this.subUid ).toString();
		this.topics[topic].push({
			token: token,
			func: func
		});
		return token;
	}

	publish( topic, args ) {
		if ( !this.topics[topic] ) {
			return false;
		}
		var subscribers = this.topics[topic],
				len = subscribers ? subscribers.length : 0;

		while (len--) {
			subscribers[len].callback( topic, args );
		}
		return this;
	}
}
