import { prisma } from '../db/db';
import { Account } from '../models/account';

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

    async createAccount(name: string, balance: number) {
        const newAccount = new Account(name, balance);
        const account = await prisma.user.create({
            data: {
                name: newAccount.name,
                balance: newAccount.balance,
                id: newAccount.id
            }
        });
    }

    async _listAccounts () {
        const account = prisma.user.findMany();
        return account;
    }

    async deposit(amount: number, id: string) {
        try {
            const account = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })
            if (!account) {
                throw new Error('Account not found');
            }
            account.balance += amount;
            return await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    balance: account.balance
                }
            })
        } catch ( error ) {
            return error;
        }
    }

    async withdraw(amount: number, id: string) {
        try {
            const account = await prisma.user.findMany({
                where: {
                    id: id
                }
            })
            if (!account) {
                throw new Error('Account not found');
            }

            if (account[0].balance < amount) {
                throw new Error('Insufficient funds');
            }
            
            await prisma.user.update({
                where: { id },
                data: {
                  balance: account[0].balance -= amount
                },
              });

        console.log("Withdraw completed".green);
        } catch ( error ) {
            return error;
        }
    }

    async checkBalance(id: string) {
       const account = await prisma.user.findMany({
            where: {id}
       });
        console.log("\n");
        console.log("Your balance is: ".green, account[0].balance);
    }

    
    async transfer(amount: number ,userId: string, recipientId: string) {
        try {
            const accounts = await prisma.user.findMany({
                where: {
                    id: { in: [userId, recipientId] }
                }
            });
            if (!accounts) {
                throw new Error('Account not found');
            }
    
            if (accounts[0].balance < amount) {
                throw new Error('Insufficient funds');
            }

            const check = await prisma.transaction.create({
                data: {
                    senderId: userId,
                    name: accounts[0].name,
                    sender: accounts[1].name,
                    amount
                }
            })

            if (!check) {
                throw new Error('Error in transaction');
            }

            await prisma.user.update({
                where: { id: userId },
                data: {
                    balance: accounts[0].balance -= amount
                },
            });

            await prisma.user.update({
                where: { id: recipientId },
                data: {
                    balance: accounts[1].balance += amount
                },
            })
            console.log("Transfer completed".green);
        } catch(error) {
            return error;
        }

    }

    async checkTransactions(id: string) {
        const transactions = await prisma.transaction.findMany({
            where: {
              senderId: id,        
            }
        })
        return transactions;
    }

    async loadData() {
        const data = await prisma.user.findMany({
            select: {
                name: true,
                balance: true,
                id: true
            }
        });
        return data;
    }
    
}
