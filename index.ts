import { input, menu } from "./helpers/menu";
import { Accounts } from "./helpers/accounts";



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
            case '7':
                console.log($accounts._listAccounts());
            break;

        }
    } while(opt !== '0');
}

main();