import { expect } from "chai";
import { Person } from "../core/Person";

class FullHandler implements ProxyHandler<any> {
	log: string;
	constructor() {
		this.log = "";
	}
	// traps
	get(target: any, property: any, receiver: unknown): any {
		const message = `Getting property: ${property}`;
		console.log(message);
		//# Important
		this.log += message + ";";
		const val = Reflect.get(target, property, receiver);
		if(typeof (val) === 'function') {
			return new Proxy(val, this);
		}
		return val;
	}
	set(target: any, property: any, value: any, receiver: any): boolean {
		const message = `Setting property: ${property}`;
		console.log(message);
		//# Important
		this.log += message + ";";
		target[property] = value; return true;//Reflect.set(target, property, value, receiver);
	}
	has(target: object, property: PropertyKey): boolean {
		const message = `Checking if property exists: ${String(property)}`;
		console.log(message);
		this.log += message + ";";
		return Reflect.has(target, property);
	}
	deleteProperty(target: object, property: PropertyKey): boolean {
		const message = `Deleting property: ${String(property)}`;
		console.log(message);
		this.log += message + ";";
		return Reflect.deleteProperty(target, property);
	}
	apply(target: any, thisArg: any[], argumentsList: any[]): unknown {
		const message = `Calling function: ${target.name}`;
		console.log(message);
		this.log += message + ";";
		return Reflect.apply(target, thisArg, argumentsList);
	}
	construct(target: any, argumentsList: any[], newTarget: Function): object {
		const message = `Creating new instance of ${target.name}`;
		console.log(message);
		this.log += message + ";";
		return Reflect.construct(target, argumentsList, newTarget);
	}
	getPrototypeOf(target: object): object {
		const message = `Getting prototype of the target`;
		console.log(message);
		this.log += message + ";";
		return Reflect.getPrototypeOf(target);
	}
	setPrototypeOf(target: object, prototype: object): boolean {
		const message = `Setting prototype of the target`;
		return Reflect.setPrototypeOf(target, prototype);
	}
	isExtensible(target: object): boolean {
		const message = `Checking if the target is extensible`;
		console.log(message);
		this.log += message + ";";
		return Reflect.isExtensible(target);
	}
	preventExtensions(target: object): boolean {
		const message = `Preventing extensions on the target`;
		console.log(message);
		this.log += message + ";";
		return Reflect.preventExtensions(target);
	}
	getOwnPropertyDescriptor(target: any, property: any): TypedPropertyDescriptor<any> {
		const message = `Getting property descriptor: ${property}`;
		console.log(message);
		this.log += message + ";";
		return Reflect.getOwnPropertyDescriptor(target, property);
	}
	defineProperty(target: object, property: PropertyKey, descriptor: PropertyDescriptor & ThisType<any>): boolean {
		const message = `Defining property: ${String(property)}`;
		console.log(message);
		this.log += message + ";";
		return Reflect.defineProperty(target, property, descriptor);
	}
	ownKeys(target: any): ArrayLike<string | symbol> {
		const message = `Getting own keys of the target`;
		console.log(message);
		this.log += message + ";";
		return Reflect.ownKeys(target);
	}
}

describe("Given full proxy", () => {
	let person: Person;
	let handler: FullHandler;
	beforeEach("Before each", () => {
		const originalPerson = new Person("John", "Wick", 30);
		handler = new FullHandler();
		person = new Proxy<Person>(originalPerson, handler);
	});
	it("When getting property, call is logged", () => {
		person.firstName; // Output: Getting property: firstName
		
		expect(handler.log).to.contain("Getting property: firstName");
	});
	it("When setting property, call is logged", () => {
		person.age = 32; // Output: Setting property: age

		expect(handler.log).to.contain("Setting property: age");
	});
	it("When deleting property, call is logged", () => {
		delete person.lastName; // Output: Deleting property: lastName

		expect(handler.log).to.contain("Deleting property: lastName");
	});
	it("When calling print, info is returned", () => {
		const result = person.print();
		
		expect(result).to.eq("John Wick, 30");
	});
	it("When calling print, call is logged", () => {
		const result = person.print(); // Output: ??

		expect(handler.log).to.contain("Calling function: print");
	});
});
