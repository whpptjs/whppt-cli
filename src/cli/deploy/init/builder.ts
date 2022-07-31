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
    .option('replace', {
      alias: 'r',
      describe: 'replace your deployment settings',
      type: 'boolean',
    })
    .demandOption(['host', 'projectType'], 'Please provide both host and project type arguments to initialise your deployment');
};
