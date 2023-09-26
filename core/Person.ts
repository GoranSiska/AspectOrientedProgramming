import { Address } from "./Address";

export class Person {
    firstName: string;
    lastName: string;
    age: number;
    address: Address;
    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = new Address("n/a", -1, "n/a");
    }
    print(): string {
        return `${this.firstName} ${this.lastName}, ${this.age}`;
    }
};
