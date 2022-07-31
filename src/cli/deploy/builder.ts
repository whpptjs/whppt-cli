import yargs from 'yargs';
import { init, deployInitExamples } from './init';
import { prep, deployPrepExamples } from './prep';

export const builder: yargs.CommandBuilder = yrgs => {
  return yrgs
    .command(init)
    .command(prep)
    .demandCommand(1)
    .example([...deployInitExamples, ...deployPrepExamples]);
};
