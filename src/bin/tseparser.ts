#!/usr/bin/env node
import { Command } from 'commander';
import pkg from '../../package.json';

const program = new Command();

program
    .version(pkg.version)
    .description('A simple CLI parser to crunch public CSV data from the Supreme Electoral Court in Brazil.')
    .command('file', 'Handle file operations', { executableFile: './commands/tseparser-file' });

program.parse(process.argv);