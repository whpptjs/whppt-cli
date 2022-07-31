import { promises, existsSync } from 'fs';
import path from 'path';
// import Serverless from 'serverless';

const deployDir = path.join('.', 'deploy');
const buildDir = path.join('.', '.next', 'standalone');
const buildDeployDir = path.join(buildDir, '.deploy');
const filesDir = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'files', 'aws', 'next');
const toolsDir = path.join(filesDir, 'tools');

// const serverlessConfig = {
//   serviceDir: deployDir,
//   configurationFilename: 'serverless.yml',
//   configuration: {},
//   commands: ['deploy'],
//   options: {
//     'aws-profile': 'svelte',
//     region: 'ap-southeast-2',
//     stage: 'dev',
//   },
// };
// const serverless = new Serverless(serverlessConfig);

export const init = ({ environment }: { environment: string }) => {
  const dockerPolicySrc = path.join(deployDir, 'dockerRepoLifecyclePolicy.js');
  const dockerPolicyDest = path.join(buildDeployDir, 'dockerRepoLifecyclePolicy.js');

  const serverlessSrc = path.join(deployDir, `serverless.${environment}.yml`);
  const serverlessDest = path.join(buildDir, 'serverless.yml');

  const commonSrc = path.join(filesDir, 'serverless.common.yml');
  const commonDest = path.join(buildDeployDir, 'serverless.common.yml');

  const compatSrc = path.join(toolsDir, 'compatLayer.js');
  const compatDest = path.join(buildDir, 'compatLayer.js');

  const reqHandlerSrc = path.join(toolsDir, 'requestHandler.js');
  const reqHandlerDest = path.join(buildDir, 'requestHandler.js');

  let p = Promise.resolve();
  if (!existsSync(buildDir)) p = p.then(() => promises.mkdir(buildDir));
  if (!existsSync(buildDeployDir)) p = p.then(() => promises.mkdir(buildDeployDir));
  p = p.then(() => promises.cp(dockerPolicySrc, dockerPolicyDest));
  p = p.then(() => promises.cp(serverlessSrc, serverlessDest));
  p = p.then(() => promises.cp(commonSrc, commonDest));
  p = p.then(() => promises.cp(compatSrc, compatDest));
  p = p.then(() => promises.cp(reqHandlerSrc, reqHandlerDest));
  // p = p.then(() => serverless.init());
  // p = p.then(() => serverless.run());
  return p;
};
