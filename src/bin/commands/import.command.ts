import { Command } from 'commander';

const program = new Command();

program
    .argument('<url>', 'The MongoDB connection URL you wish to import CSV data into')
    .action((url) => console.log(url));

program.parse(process.argv);