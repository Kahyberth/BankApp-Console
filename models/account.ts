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
}