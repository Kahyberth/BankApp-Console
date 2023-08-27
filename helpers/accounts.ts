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
        this.addAccount().forEach(account => {
            console.log(account.toString());
        })
    }

    


}