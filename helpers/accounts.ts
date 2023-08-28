import { Account } from "../models/account";
export class Accounts {
    
    listAccounts: Record<string, Account> = {};

    constructor () {
        this.listAccounts = {};
    }

    addAccount() {
        const list: Account[] = [];
        Object.keys(this.listAccounts).forEach((key) => {
                const newAccount  = this.listAccounts[key];
                list.push(newAccount);
        });
        return list;
    }

    createAccount(name: string, balance: number) {
        const newAccount = new Account(name, balance);
        this.listAccounts[newAccount.name] = newAccount;
    }


    _listAccounts () {
        const account = this.addAccount().map(account => account.toString());
        return account;
    }

    deposit(amount: number, id: string) {
        this.addAccount().forEach(account => {
            if (account.id === id) {
                account.deposit(amount);
            }
        });
    }

    withdraw(amount: number, id: string) {
        this.addAccount().forEach(account => {
            if (account.id === id) {
                if (amount > account.balance) {
                    console.log("Insufficient funds");
                    return;
                }
                account.withdraw(amount);
            }
        });
    }

    


}