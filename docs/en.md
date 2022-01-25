# SEC CSV Parser

This parser enables you to import public electoral data from the Supreme Electoral Court in Brazil into MongoDB 
for easy statistical analysis & APi construction. It uses [Paparse](https://www.npmjs.com/package/papaparse) inside
to provide quick & precise parsing & [Mongoose](https://www.npmjs.com/package/mongoose) as ORM to provide an easy
API for schema composition & DB CRUD operations. This tool was created to provide easy parsing & data updating, 
since DB updates are issued via CSV and it's hard to keep databases in sync with the latest changes from the SEC.

CLI tool built using [Commander.js](https://www.npmjs.com/package/commander) & [Colors.js](https://www.npmjs.com/package/colors).
Other libs will be here when they're actually used in the project.

# Basic Usage

To run the project, you need to
1. Clone this repo
2. Install dependecies
3. Build
4. Link it

and that's it. Things will be simpler when it's published on NPM.

1. ``` git clone https://github.com/unimatrix2/tse-database-parser ```
2. ``` npm install ```
3. ``` npm run build ```
4. ``` npm link ```
5. Run from linked PATH as ``` tseparser <file path> <mongodb uri>```

## Commands

Right now, there's only one base command: parse. More commands are backlogged but this tool is being developed
needs-first as part of a major project, so dinamic modeling, multi parsing (JSON, SQL Databases, etc) won't come
for some time.
```
Usage: tseparser [options] [command]

A simple CLI parser to crunch public CSV data from the Supreme Electoral Court in Brazil.

Options:
- -V, --version   output the version number
- -h, --help      display help for command

Commands:
- parse           Handle parsing operations
- help [command]  display help for command
```
### Parse
```
Usage: parse [options] <file> <MongoDB URI>

Arguments:
- file          Path of the file to be parsed (needs absolute path)
- MongoDB URI   The MongoDB connection URI for parsing

Options:
- -u, --update  Indicates you wish to update an existing database
- -h, --help    display help for command
```
For offline help, use ``` tseparser -h ``` or  ``` tseparser parse -h ```