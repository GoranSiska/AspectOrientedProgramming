import {expect} from "chai";
import { EventEmitter } from "events";
import { Person } from "../core/Person";
import { Address } from "../core/Address";

describe("Given useful proxies", () => {
	describe("Given has proxy", () => {
		class Range {
			from: number;
			to: number;
			constructor(from: number, to: number) {
				this.from = from;
				this.to = to;
			}
		}
		it("When calling in, checks if number is in range", () => {
			const originalRange = new Range(0, 10);
			const range = new Proxy<Range>(originalRange, {
				has(target: Range, prop: string): boolean {
					const val = parseInt(prop);
					if(!val) {
						return false;
					}
					return val >= target.from && val <= target.to;
				  }
			})

			expect(2 in range).to.be.true;
			expect(12 in range).to.be.false;
		})
	}),
	describe("Given validating proxy", () => {
		class Range {
			from: number;
			to: number;
			constructor(from: number, to: number) {
				this.from = from;
				this.to = to;
			}
		}
		it("When creating SafeRange, checks if range is correct", () => {
			const SafeRange = new Proxy(Range, {
				construct(target: any, argumentsList: number[], newTarget: Function): any {
					const from = argumentsList[0];
					const to = argumentsList[1];
					if(to < from) {
						throw new Error("To was smaller than from!");
					}
					return Reflect.construct(target, argumentsList, newTarget);
				}
			})
			
			expect(() => new SafeRange(1,10)).to.not.throw();
			expect(() => new SafeRange(10, 1)).to.throw("To was smaller than from!");
		})
	}),
	describe("Given observable proxy", () => {
		let bus: EventEmitter;
		let log: string;
		let originalPerson: Person;
		beforeEach("Before each", () => {
			bus = new EventEmitter();
			log = "";
			bus.on("PropertyChanged", (path, property, oldValue, newValue) => {
				log = `${path}${property} changed from ${oldValue} to ${newValue}`;
			});
			originalPerson = new Person("John", "Wick", 32);
			originalPerson.address = new Address("Continental", 1, "New York");
		})
		it("When setting nested propery, event is not raised", () => {
			const handler = {
				path: "Person.",
				set(target: any, property: any, value: any, receiver: any): boolean {
					const oldValue = Reflect.get(target, property, receiver);
					const result = Reflect.set(target, property, receiver);
					if(result) {
						bus.emit("PropertyChanged", this.path, property, oldValue, value);
					}
					return result;
				}
			}
			const person = new Proxy<Person>(originalPerson, handler);

			person.firstName = "Jack";
			expect(log).to.contain("Person.firstName changed from John to Jack");
			
			person.address.city = "Chicago";
			expect(log).to.not.contain("Person.address.city changed from New York to Chicago");
		});

		it("With recursive proxy, when setting nested propery, event is raised", () => {
			const handler = {
				path: "Person.",
				get(target: any, property: any, receiver: unknown): any {
					const val = Reflect.get(target, property, receiver);
					//# Important
					if(typeof val === "object" && val != null) {
						this.path += `${property}.`;
						return new Proxy(val, handler);
					}
					return val;
				},
				set(target: any, property: any, value: any, receiver: any): boolean {
					const oldValue = Reflect.get(target, property, receiver);
					const result = Reflect.set(target, property, receiver);
					if(result) {
						bus.emit("PropertyChanged", this.path, property, oldValue, value);
					}
					return result;
				}
			}
			const person = new Proxy<Person>(originalPerson, handler);

			person.firstName = "Jack";
			expect(log).to.contain("Person.firstName changed from John to Jack");
			
			person.address.city = "Chicago";
			expect(log).to.contain("Person.address.city changed from New York to Chicago");
		});
	})
});
