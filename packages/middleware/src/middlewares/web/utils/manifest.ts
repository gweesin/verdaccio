import buildDebug from 'debug';

import { ViteManifest, ViteManifestChunk, WebpackManifest } from './template';

export type Manifest = {
  // goes on first place at the header
  ico: string;
  css: string[];
  js: string[];
};

const debug = buildDebug('verdaccio:middleware:web:render:manifest');

export function getManifestValue(
  manifestItems: string[],
  manifest: WebpackManifest | ViteManifest,
  basePath: string = ''
): string[] {
  return manifestItems?.map((item) => {
    debug('resolve item %o', item);

    let resolvedItem;

    if (typeof manifest[item] === 'string') {
      resolvedItem = `${basePath}${manifest[item]}`;
    } else {
      const manifestItem = Object.values(manifest).find((chunk: ViteManifestChunk) =>
        chunk.file.endsWith(item)
      );

      resolvedItem = `${basePath}/-/static/${manifestItem.file}`;
    }
    debug('resolved item %o', resolvedItem);
    return resolvedItem;
  });
}
