import {expect} from "chai";
import { Person } from "../core/Person";

describe("Given Proxy limitations", () => {
	describe("Given objects with internal slots", () => {
		it("When proxy-ing map, error is thrown", () => {
			let map = new Map();

			let proxy = new Proxy(map, {});

			expect(() => proxy.set('test', 1)).to.throw("Method Map.prototype.set called on incompatible receiver");
		});
		it("When proxy-ing map with function binding, set works", () => {
			let map = new Map();

			let proxy = new Proxy(map, {
				get(target: any, property: string, receiver: any): any {
					let value = Reflect.get(target, property, receiver);
					return typeof value === "function" ? value.bind(target) : value;
				}
			});
			
			proxy.set("test", 1);

			expect(proxy.get("test")).to.eq(1);
		});
	}),
	describe("Given equality checks", () => {
		it("When adding person proxy to set, set does not contain person", () => {
			const set = new Set();

			const person = new Person("John", "Wick", 32);
			const personProxy = new Proxy(person, {});

			set.add(personProxy);

			expect(set.has(person)).to.be.false;
		});
	}),
	describe("Given context sensitive operations", () => {
		const _codeNames = new WeakMap();
		class PersonWithSecret extends Person {
			constructor(firstName: string, lastName: string, age: number, codeName: string) {
				super(firstName, lastName, age);
				_codeNames.set(this, codeName);
			}
			get codeName() {
				return _codeNames.get(this);
			}
		};
		it("With PersonWithSected codeName, codeName is returned.", () => {
			const person = new PersonWithSecret("John", "Wick", 32, "007");
	
			expect(person.firstName).to.eq("John");
			expect(person.codeName).to.eq("007");
		}),
		it("With PersonWithSected proxy, codeName is undefined", () => {
			const originalPerson = new PersonWithSecret("John", "Wick", 32, "007");
			const person = new Proxy<PersonWithSecret>(originalPerson, {});
	
			expect(person.firstName).to.eq("John");
			expect(person.codeName).to.be.undefined;
		});
		it("With PersonWithSected proxy and context switch, codeName is returned", () => {
			const originalPerson = new PersonWithSecret("John", "Wick", 32, "007");
			const person = new Proxy<PersonWithSecret>(originalPerson, {
				get(target: any, property: string, receiver: any): any {
					return Reflect.get(target, property, target);
				}
			});
	
			expect(person.firstName).to.eq("John");
			expect(person.codeName).to.eq("007");
		});
	})
});