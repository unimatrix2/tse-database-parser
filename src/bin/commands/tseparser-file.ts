import { Command } from 'commander';

const program = new Command();

program
    .command('path')
    .description('The path of the file to parse')
    .action((file) => {
    console.log('Hello from file', file);
});

program.parse(process.argv);