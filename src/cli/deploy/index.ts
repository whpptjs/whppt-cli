import yargs from 'yargs';
import { builder } from './builder';

import { deployInitExamples } from './init';

export const deploy: yargs.CommandModule = {
  command: 'deploy',
  describe: 'Deploy your site',
  builder,
  handler: () => {},
};

export const deployExamples: [string, string?][] = [
  ...deployInitExamples,
  ['whppt deploy prep aws next', 'Prepare to deploy your @whppt/next site to aws'],
];
