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
		this.tip = 0
		this.createTestingDataSet3()
	}

	private createTestingDataSet1() {
		this.people.push({ amount: 0, name: 'P1', fees: [2] })
		this.people.push({ amount: 0, name: 'P2', fees: [6] })
		this.commonFee.fees[0] = 2
		this.total = 10
		this.tip = 2
	}

	private createTestingDataSet2() {
		this.people.push({ amount: 0, name: 'P1', fees: [7.53, 8] })
		this.people.push({ amount: 0, name: 'P2', fees: [5, 2] })
		this.commonFee.fees[0] = 5
		this.total = 30
		this.tip = 2
	}

	private createTestingDataSet3() {
		this.people.push({ amount: 0, name: 'P1', fees: [7.49, 3.99] })
		this.people.push({ amount: 0, name: 'P2', fees: [1.79] })
		this.commonFee.fees = [1.25, 2.69, 4.49, 4.39, 7.98, 4.39, 1.25, 5.49, 1.29, 1.29, 1.29, 1.25, 1.25]
		this.total = 55.43
		this.tip = 0
	}

	private getPersonByIndex(personIndex: number): Person {
		if (personIndex == -1) {
			return this.commonFee
		} else {
			return this.people[personIndex]
		}
	}

	public addFee(personIndex: number) {
		this.getPersonByIndex(personIndex).fees.push(null)
	}

	public removeFee(personIndex: number, feeIndex: number) {
		this.getPersonByIndex(personIndex).fees.splice(feeIndex, 1)
	}

	public addPerson() {
		this.people.push({
			name: `Person ${this.people.length + 1}`,
			fees: [null],
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
				fee = parseFloat(<any>fee)
				person.amount += fee
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