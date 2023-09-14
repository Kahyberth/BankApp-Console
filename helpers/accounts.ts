import { $checkBalance, $checkTransactions, $deposit, $listAccounts, $loadData, $transfer, $withdraw, createUser } from '../db/queries';
import { Account } from '../models/account';

interface Transaction {
    sender: { name: string; id: string };
    recipient: { name: string; id: string };
    amount: { amount: number; date: string };
}
export class Accounts {
    
    constructor () {
        this.loadData();
    }
    /**
     * 
     * @param name 
     * @param balance 
     * @returns 
     */
    async createAccount(name: string, balance: number) {
        return await createUser(new Account(name, balance));
    }


    /**
     * 
     * @returns $listAccounts() A list of all created accounts
     */
    async _listAccounts () {
        return $listAccounts();
    }

    /**
     * 
     * @param amount Amount of money to be deposited
     * @param id Id of the user to whom the deposit will be made
     */

    async deposit(amount: number, id: string) {
        $deposit(amount, id);
    }

    /**
     * 
     * @param amount Amount of money to be withdrawn
     * @param id Id of the user to whom the money is to be withdrawn
     */

    async withdraw(amount: number, id: string) {
        $withdraw(amount, id);
    }

    /**
     * This function returns the amount of money that the person has. 
     * @param id Id of the person to whom the money will be reviewed
     */
    async checkBalance(id: string) {
       $checkBalance(id);
    }

    /**
     * 
     * @param amount Amount of money to be transferred
     * @param userId Money sender id
     * @param recipientId id of the recipient of the money
     */
    async transfer(amount: number ,userId: string, recipientId: string) {
        $transfer(amount, userId, recipientId);
    }
    /**
     * 
     * @param id Reviews the transactions that a person has made, by means of his or her id.
     */
    async checkTransactions(id: string) {
        $checkTransactions(id);
    }

    /**
     * Load data to the menu 
     */
    async loadData() {
        return await $loadData();
    }
    
}
