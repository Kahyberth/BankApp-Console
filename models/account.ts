import { v4 as uuidv4 } from 'uuid';

export class Account {
    name: string;
    balance: number;
    id: string;
    constructor(name: string, balance: number) {
        this.name = name;
        this.balance = balance;
        this.id = uuidv4();
    }

    deposit(amount: number) {
        this.balance += amount;
    }

    withdraw(amount: number) {
        this.balance -= amount;
    }

    checkBalance() {
        return {
            name: this.name,
            balance: this.balance,
        }
    }

    toString() {
        return {
            name: this.name,
            balance: this.balance,
            id: this.id
        }
    }

    transfer(amount: number, account: Account) {
        if (amount > this.balance) {
            console.log("Insufficient funds");
            return;
        }
        this.withdraw(amount);
        account.deposit(amount);
    }
}