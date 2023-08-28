import { Account } from "../models/account";

interface Transaction {
    sender: { name: string; id: string };
    recipient: { name: string; id: string };
    amount: { amount: number; date: string };
}
export class Accounts {
    
    listAccounts: Record<string, Account> = {};
    historyTransactions: Record<string, Transaction[]> = {};
    constructor () {
        this.listAccounts = {};
        this.historyTransactions = {};
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

    checkBalance(id: string) {
        const account = this.addAccount().find(account => account.id === id);
        if (!account) {
            throw new Error('Account not found');
        }
        console.log(account.checkBalance());
    }

    
    transfer(amount: number ,userId: string, recipientId: string) {
        const user = this.addAccount();
        const userData = user.find(account => account.id === userId);
        const recipientData = user.find(account => account.id === recipientId);
        if ( !userData || !recipientData) {
            throw new Error('User not found');
        } 
        
        if ( amount > userData.balance ) {
            throw new Error('Insufficient funds');
        }
        userData.withdraw(amount);

        recipientData.deposit(amount);
        const info = {
            sender: {
                name: userData.name,
                id: userData.id
            },
            recipient: {
                name: recipientData.name,
                id: recipientData.id
            },
            amount: {
                amount,
                date: new Date().toISOString()
            }
        }

        if (!this.historyTransactions[userData.id]) {
            this.historyTransactions[userData.id] = [];
            this.historyTransactions[recipientData.id] = [];
        }

        this.historyTransactions[userData.id].push(info);
        this.historyTransactions[recipientData.id].push(info);

        return info;
    }

    checkTransactions(id: string) {
        return this.historyTransactions[id];
    }
}
