#!/usr/bin/env node
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

import { deploy, deployExamples } from './deploy';

yargs(hideBin(process.argv))
  .command(deploy)
  .demandCommand(1)
  .example([...deployExamples])
  .help().argv;
