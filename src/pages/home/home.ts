import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	people: Array<{
		name: string,
		amount: number
		fees: Array<number>
	}>
	total: number
	tip: number

	constructor(public navCtrl: NavController) {
		this.people = new Array
		this.total
		this.tip
	}

	addFee(personIndex: number) {
		this.people[personIndex].fees.push(0)
	}

	addPerson() {
		this.people.push({
			name: `Person ${this.people.length + 1}`,
			fees: [0],
			amount: 0
		})
	}

	calculate() {
		let sum = 0
		this.total = parseFloat(<any>this.total)
		this.tip = parseFloat(<any>this.tip)
		for (let person of this.people) {
			person.amount = 0
			for (let fee of person.fees) {
				person.amount += fee
				sum += fee
			}
		}

		for(let person of this.people) {
			// console.log(typeof person.amount);
			// console.log(person.amount);
			// console.log(typeof sum);
			// console.log(sum);
			// console.log(typeof this.total);
			// console.log(this.total);
			// console.log(typeof this.tip);
			// console.log(this.tip);

			person.amount = (person.amount / sum) * (this.total + this.tip)
		}
	}

	setFee(personIndex, feeIndex, value) {
		this.people[personIndex].fees[feeIndex] = parseFloat(value)
		// console.log(value)
	}

	removeAll() {
		this.people = []
	}

}