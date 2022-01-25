import { Command } from 'commander';

import { parser } from '../../services/parse.service';

const program = new Command();

program
    .argument('<file>', 'Path of the file to be parsed (needs absolute path)')
    .argument('<MongoDB URI>', 'The MongoDB connection URI for parsing')
    .option('-u, --update', 'Indicates you wish to update an existing database')
    .action(async (
        file: string,
        uri: string,
        options: { [key: string]: boolean }
    ): Promise<void> => !options.update ? await parser(file, uri) : console.log(options));

program.parseAsync(process.argv);