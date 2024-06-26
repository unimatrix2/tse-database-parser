#!/usr/bin/env node
import { Command } from 'commander';
import pkg from '../../package.json';

const program: Command = new Command();

program
    .version(pkg.version)
    .description('A simple CLI parser to crunch public CSV data from the Supreme Electoral Court in Brazil.')
    .command('parse', 'Handle parsing operations', { executableFile: './commands/parse.command' })
    .command('download', 'Download TSE Databases from the official TSE Pulbic data repository', { executableFile: './commands/download.command' });

program.parse(process.argv);