export class Address {
    streetName: string;
    streetNumber: number;
    city: string;
    constructor(streetName: string, streetNumber: number, city: string) {
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.city = city;
    }
    print(): string {
        return `${this.streetName} ${this.streetNumber}, ${this.city}`;
    }
}
