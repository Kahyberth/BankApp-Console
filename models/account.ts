export class Account {
    
    name: string;
    balance: number;
    constructor(name: string, balance: number) {
        this.name = name;
        this.balance = balance;
    }

    deposit(amount: number) {
        this.balance += amount;
    }

    withdraw(amount: number) {
        this.balance -= amount;
    }

    checkBalance() {
        console.log(`Account balance is ${this.balance}`);
    }

    toString() {
        return `${this.name} account balance is ${this.balance}`;
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