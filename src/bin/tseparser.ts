#!/usr/bin/env node
import { Command } from 'commander';
import pkg from '../../package.json';

const program: Command = new Command();

program
    .version(pkg.version)
    .description('A simple CLI parser to crunch public CSV data from the Supreme Electoral Court in Brazil.')
    .command('parse', 'Handle parsing operations', { executableFile: './commands/parse.command' })
    //.command('convert', 'Handle conversion operations', { executableFile: './commands/convert.command' })
    //.command('import', 'Handles DB import operations', { executableFile: './commands/import.command' });

program.parse(process.argv);