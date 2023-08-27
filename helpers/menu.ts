import 'colors';
import inquirer from 'inquirer';

export const menu = async () => {
    //console.clear();
    console.log('==========================='.green);
    console.log('   Select an option'.yellow  );
    console.log('===========================\n'.green);

    const opt = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'What do you want to do?',
            choices: [ {
                value: '1',
                name: `${'1.'.green} Create account`
            },
            {
                value: '2',
                name: `${'2.'.green} deposit`
            },
            {
                value: '3',
                name: `${'3.'.green} withdraw`
            },
            {
                value: '4',
                name: `${'4.'.green} check balance`
            },
            {
                value: '5',
                name: `${'5.'.green} transfer`
            },
            {
                value: '6',
                name: `${'6.'.green} check transactions`
            },
            {
                value: '7',
                name: `${'7.'.green} list accounts`
            },
            {
                value: '0',
                name: `${'0.'.green} Exit`
            },],
        }
    ]);

    return opt.option;
}


export const input = async ( message: string ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}