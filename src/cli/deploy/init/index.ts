import yargs from 'yargs';
import { builder } from './builder';
import { handler } from './handler';

export const init: yargs.CommandModule = {
  command: 'init <host> <projectType>',
  describe: 'Initialise the deployment',
  builder,
  handler,
};

export const deployInitExamples: [string, string?][] = [
  ['whppt deploy init aws next', 'Initialise your configuration to deploy your @whppt/next site to aws'],
];
