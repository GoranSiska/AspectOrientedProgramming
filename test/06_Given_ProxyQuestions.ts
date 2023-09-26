import { expect } from "chai";
import { Person } from "../core/Person";

describe("Given Proxy questions", () => {
	it("When getting a property, missing property returns default value", () => {
		const originalPerson = new Person("John", "Wick", 32);
		const handler = {
			defaultValue: "n/a",
			get(target: any, property: any, receiver: unknown): any {
				if(!Reflect.has(target, property)) {
					return this.defaultValue;
				}
				return Reflect.get(target, property, receiver);
			}
		};
		const person = new Proxy<Person>(originalPerson, handler);

		//@ts-ignore
		const result = person.middleName;

		expect(result).to.eq("n/a");
	});
	it("When settinig a readonly property, property is unchanged", () => {
		const originalPerson = new Person("John", "Wick", 32);
		const handler = {
			readonlyProperty: "firstName",
			set(target: any, property: any, receiver: unknown): any {
				if(property === this.readonlyProperty) {
					return true;
				}
				return Reflect.set(target, property, receiver);
			}
		};
		const person = new Proxy<Person>(originalPerson, handler);

		//@ts-ignore
		person.firstName = "Jack";

		expect(person.firstName).to.eq("John");
	});
	it("When checking for hidden property, none are found", () => {
		const originalPerson = new Person("John", "Wick", 32);
		const handler = {
			hiddenProperty: "firstName",
			get(target: any, property: any, receiver: unknown): any {
				if(property === this.hiddenProperty) {
					return undefined;
				}
				return Reflect.get(target, property, receiver);
			},
			has(target: object, property: PropertyKey): boolean {
				if(property.toString() === this.hiddenProperty) {
					return false;
				}
				return Reflect.has(target, property);
			},
			ownKeys(target: any): ArrayLike<string | symbol> {
				const props = Reflect.ownKeys(target);
				props.splice(props.indexOf(this.hiddenProperty), 1);
				return props;
			}
		};
		const person = new Proxy<Person>(originalPerson, handler);

		expect(person.firstName).to.be.undefined;

		expect("firstName" in person).to.be.false;

		expect(Object.keys(person)).to.not.contain("firstName");
	});
	it("When calling a method second time with same params, cached value is returned", () => {
		const handler = {
			cache: new WeakMap(),
			apply(target: any, thisArg: any[], argumentsList: any[]): unknown {
				if(!this.cache.has(argumentsList[0])) {
					const result = Reflect.apply(target, thisArg, argumentsList);
					this.cache.set(argumentsList[0], result);
				}
				return this.cache.get(argumentsList[0]);
			}
		};
		const getFirstNameFunction = (person: Person) => {
			return person.firstName;
		}
		const getFirstName = new Proxy(getFirstNameFunction, handler);
		const person1 = new Person("John", "Wick", 32);
		const person2 = new Person("Jack", "Wick", 32);
		
		expect(getFirstName(person1)).to.eq("John");
		expect(getFirstName(person2)).to.eq("Jack");

		person2.firstName = "Jill";

		expect(getFirstName(person2)).to.eq("Jack");
	});
});