import { accountList, input, menu, pause } from "./helpers/menu";
import { Accounts } from "./helpers/accounts";
import { Account } from "./models/account";



const main = async () => {
    let opt = '';
    const $accounts = new Accounts();
    do {
        opt = await menu();
        switch (opt) {
            case '1':
                const name = await input('Enter your name: ');
                const balance = await input('Enter your balance: ');
                if ( !name && !balance ) {
                    throw new Error('Name and balance are required');
                } 
                $accounts.createAccount(name, Number(balance));
            break;
            case '2':
                const depositAmount = await input('Enter the amount to deposit: ');
                if ( !depositAmount ) {
                    throw new Error('Amount is required'.green);
                }
                const depositId = await accountList($accounts.addAccount());
                $accounts.deposit(Number(depositAmount), depositId);
                console.log('Deposit completed'.green);
            break;
            case '3':
                const withdrawAmount = await input('Enter the amount to withdraw: ');
                if ( !withdrawAmount ) {
                    throw new Error('Amount is required'.green);
                }
                const withdrawId = await accountList($accounts.addAccount());
                $accounts.withdraw(Number(withdrawAmount), withdrawId);
                console.log('Withdraw completed'.green);
            break;
            case '7':
                const list = $accounts._listAccounts();
                console.log(list);
            break;

        }
        await pause();
    } while(opt !== '0');
}

main();