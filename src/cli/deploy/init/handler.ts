import { ArgumentsCamelCase } from 'yargs';
import { deploy } from '../../../index';

export type initHandlerArgs = ArgumentsCamelCase<{}> & {
  host: string;
  projectType: string;
  replace: string;
};

export const handler = (args: initHandlerArgs) => {
  const { host, projectType, replace } = args;
  const cmd = deploy?.[host]?.[projectType];
  if (!cmd) throw new Error(`Could not find init provider for ${host} ${projectType}`);
  return cmd.init({ replace });
};
