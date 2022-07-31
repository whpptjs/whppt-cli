import { ArgumentsCamelCase } from 'yargs';
import { deploy } from '../../../index';

export type initHandlerArgs = ArgumentsCamelCase<{}> & {
  host: string;
  projectType: string;
  environment: string;
};

export const handler = (args: initHandlerArgs) => {
  const { host, projectType, environment } = args;
  const cmd = deploy?.[host]?.[projectType];
  if (!cmd) throw new Error(`Could not find prep cmd for ${host} ${projectType}`);
  return cmd.prep({ environment });
};
