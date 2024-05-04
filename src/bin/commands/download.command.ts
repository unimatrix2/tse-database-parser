import { Command } from 'commander';
import { download } from '../../services/download.service';

const program = new Command();

program
  .argument('<years>', 'Election year(s) to download data from')
  .argument('<path>', 'Path to save the downloaded files to')
  .action(download);

program.parseAsync(process.argv);