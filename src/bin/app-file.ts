import { Command } from 'commander';

const program = new Command();

program
    .option('-f, --file', 'Path of the CSV file to be parsed')
    .action((file) => {
    console.log('Hello from file', file);
});