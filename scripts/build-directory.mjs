import path from 'node:path';
import { tmpdir } from 'node:os';

// Release assets are built outside synced workspaces. External output is always
// a fresh dist child of a tool-created temporary directory, never a deletion target.
export function buildDirectory(root, external = process.env.ZIMONAI_RELEASE_DIST) {
  if (!external) return path.join(root, 'dist');
  const target = path.resolve(external);
  const parent = path.dirname(target);
  if (path.basename(target) !== 'dist'
      || !/^zimonai-production-[A-Za-z0-9]+$/.test(path.basename(parent))
      || path.dirname(parent) !== path.resolve(tmpdir())) {
    throw new Error('Release output must be a dist directory inside a fresh zimonai-production temporary directory.');
  }
  return target;
}
