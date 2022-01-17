#!/usr/bin/env node
import { Command } from 'commander';
import pkg from '../../package.json';

const root = new Command();

root
    .version(pkg.version)
    .description('A simple CLI parser to crunch public CSV data from the Supreme Electoral Court in Brazil.')
    .command('file')
    .description('Handles file operations')
    .argument('<file>', 'Path of CSV file to be parsed')
    .action((file) => {
        console.log('Hello from file', file);
    });

root.parse(process.argv);

export default root;