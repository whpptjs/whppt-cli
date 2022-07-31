import { promises, existsSync } from 'fs';
import path from 'path';

export const init = ({ replace }: { replace: boolean }) => {
  const deployDir = path.join('.', 'deploy');
  const filesDir = path.join(__dirname, '..', '..', '..', '..', 'files');

  const dockerPolicySrc = path.join(filesDir, 'aws', 'next', 'dockerRepoLifecyclePolicy.js');
  const dockerPolicyDest = path.join(deployDir, 'dockerRepoLifecyclePolicy.js');

  const devSrc = path.join(filesDir, 'aws', 'next', 'serverless.dev.yml');
  const devDest = path.join(deployDir, 'serverless.dev.yml');

  const liveSrc = path.join(filesDir, 'aws', 'next', 'serverless.live.yml');
  const liveDest = path.join(deployDir, 'serverless.live.yml');

  let p = Promise.resolve();
  if (!existsSync(deployDir)) p = p.then(() => promises.mkdir(deployDir));
  if (!existsSync(dockerPolicyDest) || replace) p = p.then(() => promises.cp(dockerPolicySrc, dockerPolicyDest));
  if (!existsSync(devDest) || replace) p = p.then(() => promises.cp(devSrc, devDest));
  if (!existsSync(liveDest) || replace) p = p.then(() => promises.cp(liveSrc, liveDest));
  return p;
};
