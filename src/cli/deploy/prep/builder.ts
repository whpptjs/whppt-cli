import yargs from 'yargs';

export const builder: yargs.CommandBuilder = yrgs => {
  return yrgs
    .positional('host', {
      describe: 'Cloud provider to host your site',
      choices: ['aws'],
      type: 'string',
    })
    .positional('projectType', {
      describe: 'Project type',
      choices: ['next', 'nuxt'],
      type: 'string',
    })
    .positional('environment', {
      describe: 'Deployment environment',
      type: 'string',
    })
    .demandOption(
      ['host', 'projectType', 'environment'],
      'Please provide host, project type and environment arguments to prepare your deployment'
    );
};
