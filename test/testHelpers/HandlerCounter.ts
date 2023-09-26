export class HandlerCounter {
	getCounter: Counter;
	setCounter: Counter;
	hasCounter: Counter;
	deletePropertyCounter: Counter;
	applyCounter: Counter;
	constructCounter: Counter;
	getPrototypeOfCounter: Counter;
	setPrototypeOfCounter: Counter;
	isExtensibleCounter: Counter;
	preventExtensionsCounter: Counter;
	getOwnPropertyDescriptorCounter: Counter;
	definePropertyCounter: Counter;
	ownKeysCounter: Counter;
	constructor() {
		this.getCounter = new Counter();
		this.setCounter = new Counter();
		this.hasCounter = new Counter();
		this.deletePropertyCounter = new Counter();
		this.applyCounter = new Counter();
		this.constructCounter = new Counter();
		this.getPrototypeOfCounter = new Counter();
		this.setPrototypeOfCounter = new Counter();
		this.isExtensibleCounter = new Counter();
		this.preventExtensionsCounter = new Counter();
		this.getOwnPropertyDescriptorCounter = new Counter();
		this.definePropertyCounter = new Counter();
		this.ownKeysCounter = new Counter();
	}
}

export class Counter extends Map<string, number> {
	increment (key: string) {
		if(!this.has(key)) {
			super.set(key, 0);
		}
		super.set(key, 1);
	}
}
