#!/usr/bin/env node
import { argv } from 'node:process';
import inquirer from 'inquirer';
import generator from 'generate-password-ts';
import { writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
let input = argv[2];
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
    const name = response1['Name your password!'];
    const password = generator.generate({
        length: response['What should be length of your password?'],
        numbers: true
    });
    console.log(`Your password is ${name}: ${password}`);
    const data = {
        name: name,
        value: password
    };
    let sucessPhrase = 'Passwords have been saved, check them by using view command.';
    try {
        if (existsSync('passwords.json')) {
            const fileContents = await readFile('passwords.json', 'utf-8');
            const parsedFileContents = JSON.parse(fileContents);
            if (Array.isArray(parsedFileContents)) {
                parsedFileContents.push(data);
                await writeFile('passwords.json', JSON.stringify(parsedFileContents));
                console.log(sucessPhrase);
            }
            else {
                console.log('Some Error Occured!');
            }
        }
        else {
            await writeFile('passwords.json', JSON.stringify([data]));
            console.log(sucessPhrase);
        }
    }
    catch (err) {
        console.error(err);
    }
}
else if (input === 'view') {
    try {
        const file = await readFile('passwords.json', 'utf-8');
        const data = JSON.parse(file);
        const passwordString = data.map((p) => `${p.name}: ${p.value}`).join('\n');
        console.log(`\t \t Securi CLI v0.0.1 \nPasswords:\n${passwordString}`);
    }
    catch (e) {
        if (e.errno === -4058) {
            console.log('\t \t Securi CLI v0.0.1 \nNo Saved Passwords Found!');
        }
        else
            console.log(`Some Error Occured, Please report it here: https://github.com/HarshDev2/securi/issues \n\n${e}`);
    }
}
else if (!argv[2])
    console.log(`\t \t Securi CLI v0.0.1 \nCommands-\ngenerate - generates a random password and saves it.\nview - display all your saved passwords.`);
else
    console.error((`Unidentified Command: ${input}`));
