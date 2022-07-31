import { promises, existsSync } from 'fs';
import path from 'path';

export const init = ({ replace }: { replace: boolean }) => {
  const deployDir = path.join('.', 'deploy');
  const filesDir = path.join(__dirname, '..', '..', '..', '..', 'files');

  const liveSrc = path.join(filesDir, 'aws', 'next', 'serverless.live.yml');
  const liveDest = path.join(deployDir, 'serverless.live.yml');

  let p = Promise.resolve();
  if (!existsSync(deployDir)) p = p.then(() => promises.mkdir(deployDir));
  if (!existsSync(liveDest) || replace) p = p.then(() => promises.cp(liveSrc, liveDest));
  return p;
};
