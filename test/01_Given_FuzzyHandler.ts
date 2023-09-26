import { expect } from "chai";

class FuzzyHandler {
	closestMatch(properties: string[], property: string): string {
		let lowestDistance = Infinity;
		return properties.reduce((previous, currentDistance) => {
			let distance = this.distance(currentDistance, property);
			if (distance < lowestDistance) {
				lowestDistance = distance;
				return currentDistance;
			}
			return previous;
		}, "");
	}
	distance(a: string, b: string): number {
		if (a.length == 0) {
			return b.length; // inserts only
		}
		if (b.length == 0) {
			return a.length; // deletion only
		}
		let cost = (a.charAt(a.length - 1) == b.charAt(b.length - 1)) ? 0 : 1; // if substitution is required then cost is 1
		return Math.min(
			this.distance(a.substring(0, a.length - 1), b) + 1, // distance + cost of delete
			this.distance(a, b.substring(0, b.length - 1)) + 1, // distance + cost of insert
			this.distance(a.substring(0, a.length - 1), b.substring(0, b.length - 1)) + cost // distance of remaining + current cost
		);
	}
	// traps
	get(target: { [x: string]: any; }, name: string) {
		if (!(name in target)) {
			//# Important
			name = this.closestMatch(Object.getOwnPropertyNames(target), name);
		}
		return Reflect.get(target, name);
	}
}

describe("Given fuzzy proxy", () => {
	let handler = new FuzzyHandler();
	let math = Math;
	before("Given proxied Math", () => {
		Math = new Proxy<Math>(Math, handler);
	});
	after("after", () => {
		Math = math;
	})
	it("When calling powr, pow is called.", () => {
		// @ts-ignore
		const result = Math.powr(3,2);

		expect(result).to.be.equal(9);
	});
	it("When accessing PIE, PI is accessed.", () => {
		// @ts-ignore
		const result = Math.PIE;
		
		expect(result).to.be.closeTo(Math.PI, 0.0001);
	});
	it("When accessing PE, E is accidentally accessed instead of PI. :(", () => {
		// @ts-ignore
		const result = Math.PE;
		
		expect(result).to.be.closeTo(Math.E, 0.0001); // didn't work
	});
});


