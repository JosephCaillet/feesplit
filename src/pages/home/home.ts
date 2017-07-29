import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public people: Array<Person>
	public total: number
	public tip: number
	public commonFee: Person
	public areTheyFeeInCommon: boolean

	constructor(public navCtrl: NavController, private clipboard: Clipboard) {
		this.people = new Array
		this.areTheyFeeInCommon = true
		this.commonFee = {
			amount: 0,
			fees: [0],
			name: 'Common fees'
		}
		// this.createTestingData()
	}

	private createTestingData() {
		this.people.push({ amount: 0, name: 'P1', fees: [2] })
		this.people.push({ amount: 0, name: 'P2', fees: [6] })
		this.commonFee.fees[0] = 2
		this.total = 10
		this.tip = 2
	}

	private getPersonByIndex(personIndex: number): Person {
		if (personIndex == -1) {
			return this.commonFee
		} else {
			return this.people[personIndex]
		}
	}

	public addFee(personIndex: number) {
		this.getPersonByIndex(personIndex).fees.push(0)
	}

	public removeFee(personIndex: number, feeIndex: number) {
		this.getPersonByIndex(personIndex).fees.splice(feeIndex, 1)
	}

	public addPerson() {
		this.people.push({
			name: `Person ${this.people.length + 1}`,
			fees: [0],
			amount: 0
		})
	}

	public removePerson(personIndex: number) {
		this.people.splice(personIndex, 1)
		for(let i = 0; i< this.people.length; i++) {
			this.people[i].name = `Person ${i+1}`
		}
	}

	public removeAll() {
		this.people = []
	}

	public calculate() {
		let commonFee = this.areTheyFeeInCommon ? this.commonFee.fees.reduce((totalCommon, currentFee) => totalCommon + parseFloat(<any>currentFee), 0) : 0
		let commonFeeByPerson = commonFee / this.people.length
		let sum = commonFee

		this.total = parseFloat(<any>this.total)
		this.tip = parseFloat(<any>this.tip)
		for (let person of this.people) {
			person.amount = 0
			for (let fee of person.fees) {
				person.amount += parseFloat(<any>fee)
				sum += fee
			}
		}

		for (let person of this.people) {
			person.amount += commonFeeByPerson
			person.amount = (person.amount / sum) * (this.total + this.tip)
			person.amount = parseFloat(person.amount.toFixed(2))
		}
	}

	public trackByFee(index: number, fee: number) {
		return index
	}

	public copyToClipboard(personIndex: number) {
		this.clipboard.copy(`${this.getPersonByIndex(personIndex).amount}`)
	}
}