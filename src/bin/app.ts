#!/usr/bin/env node
import { Command } from 'commander';
import pkg from '../../package.json';

const root = new Command();

root
    .version(pkg.version)
    .description('A simple CLI parser to crunch public CSV data from the Supreme Electoral Court in Brazil.')
    .command('file')
    .description('Handles file operations');

root.parse(process.argv);

export default root;