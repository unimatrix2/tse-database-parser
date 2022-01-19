import { Command } from 'commander';

const program = new Command();

program
    .argument('<output>', 'Path to store converted file')
    .argument('<file type>', 'Output format of converted file')
    .action((output, file) => console.log(output, file));

program.parse(process.argv);