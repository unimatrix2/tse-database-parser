import { Command } from 'commander';

import { parser } from '../../services/parse.service';

const program = new Command();

program
    .argument('<file>', 'Path of the file to be parsed')
    .action(async (file: string) => await parser(file));

program.parse(process.argv);