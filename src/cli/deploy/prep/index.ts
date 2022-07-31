import yargs from 'yargs';
import { builder } from './builder';
import { handler } from './handler';

export const prep: yargs.CommandModule = {
  command: 'prep <host> <projectType> <environment>',
  describe: 'Initialise the deployment',
  builder,
  handler,
};

export const deployPrepExamples: [string, string?][] = [['whppt deploy prep aws next', 'Prepare to deploy your @whppt/next site to aws']];
