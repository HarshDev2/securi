#!/usr/bin/env node
import { argv } from 'node:process';
import inquirer from 'inquirer';
import generator from 'generate-password-ts';

let input: String = argv[2];

if (input === 'generate') {
    const response1 = await inquirer.prompt([{
        name: 'Name your password!',
        type: 'input',
    }]);

    const response = await inquirer.prompt([{
            name: 'What should be length of your password?',
            type: 'list',
            choices: [6, 8, 10, 12, 16, 20]
        }
    ]);

    const name = response1['Name your password!']

    const password = generator.generate({
        length: response['What should be length of your password?'],
        numbers: true
    });
    
    console.log(`Your password is ${name}: ${password}`);
}

else if (input === 'view') {
    console.log('View is being built.')
}

else if(!argv[2]) console.log(`\t \t Securi CLI v0.0.1 \nCommands-\ngenerate - generates a random password and saves it.\nview - display all your saved passwords.`)

else console.error((`Unidentified Command: ${input}`));