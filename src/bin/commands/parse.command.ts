import { Command } from 'commander';

const program = new Command();

program
    .argument('<file>', 'Path of the file to be parsed')
    .action((file) => console.log(file));

program.parse(process.argv);