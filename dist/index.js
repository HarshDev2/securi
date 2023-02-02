#!/usr/bin/env node
import { argv } from 'node:process';
import inquirer from 'inquirer';
import generator from 'generate-password-ts';
let input = argv[2];
if (input === 'generate') {
    const response = await inquirer.prompt([{
            name: 'What should be length of your password?',
            type: 'list',
            choices: [6, 8, 10, 12, 16, 20]
        }
    ]);
    const password = generator.generate({
        length: response['What should be length of your password?'],
        numbers: true
    });
    console.log(`Your password is ${password}`);
}
else if (!argv[2])
    console.log(`Please enter a command.`);
else
    console.error((`Unidentified Command: ${input}`));
