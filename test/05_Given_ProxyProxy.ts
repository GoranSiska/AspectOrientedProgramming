import { expect } from "chai";
import { Person } from "../core/Person";

describe("Given ProxyProxy", () => {
	it("When proxy-ing a proxy, then handlers are combined.", () => {
		let person = new Person("John", "Wick", 30);
		// create proxy of the person that logs getters
		const handler = {
			log: "",
			get(target: any, property: any, receiver: unknown): any {
				const message = `Getting property: ${property}`;
				console.log(message);
				this.log += message + ";";
				return Reflect.get(target, property, receiver);
			}
		}
		person = new Proxy(person, handler);
		// create proxy of the proxy of person that returns true when asked if isProxy
		person = new Proxy(person, {
			get(target, property, receiver) {
				if(property === "isProxy") {
					return true;
				}
				return Reflect.get(target,property, receiver);
			}
		});
		
		person.firstName; // Output: Getting property: firstName

		expect(handler.log).to.contain("Getting property: firstName");		
		// @ts-ignore
		expect(person.isProxy).to.be.true;
	});
	it("When replacing proxy-ing a Proxy with custom constructor, behavior of Proxy can be altered.", () => {
		const originalProxy = Proxy;
		// replace Proxy with a new constructor that will always wrap its own proxy around the requested proxy
		Proxy = new Proxy(Proxy, {
			construct(target: ProxyConstructor, argsArray: any[], newTarget: Function): object {
				console.log("Constructing proxy");
				// requested proxy
				var inner = Reflect.construct(target, argsArray, newTarget);
				// proxy of requested proxy that returns true when asked if isProxy
				var outer = Reflect.construct(target, [inner, {
					get(target: any, property: any, receiver: unknown): any {
						if(property === "isProxy") {
							return true;
						}
						return Reflect.get(target, property, receiver);
					}
				}], newTarget);
				return outer;
			}
		});
		// create proxy of the person that logs getters
		let person = new Person("John", "Wick", 30);
		const handler = {
			log: "",
			get(target: any, property: any, receiver: unknown): any {
				const message = `Getting property: ${property}`;
				console.log(message);
				this.log += message + ";";
				return Reflect.get(target, property, receiver);
			}
		}
		person = new Proxy(person, handler);

		person.firstName; // Output: Getting property: firstName

		expect(handler.log).to.contain("Getting property: firstName");
		// @ts-ignore
		expect(person.isProxy).to.be.true;
		Proxy = originalProxy;
	});
});