import * as esbuild from 'esbuild-wasm';
import { UNPACKAGE_URL } from '../utils/const';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // build.onResolve is to find out where is the file in our local system
      // Handle root entry of index.js file only
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href
        };
      });

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return { path: `${UNPACKAGE_URL}${args.path}`, namespace: 'a' };
      });
    }
  };
};
