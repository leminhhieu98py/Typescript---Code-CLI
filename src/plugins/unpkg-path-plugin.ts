import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import { UNPACKAGE_URL } from '../utils/const';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // build.onResolve is to find out where is the file in our local system
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(args.path, `${args.importer}/`).href
          };
        }

        return { path: `${UNPACKAGE_URL}react`, namespace: 'a' };
        // return { path: `${UNPACKAGE_URL}react/${args.path}`, namespace: 'a' };
      });

      // build.onLoad is trigger whenever a resolve is triggered -  I mean that the file is loaded
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
        const { data } = await axios.get(args.path);

        return {
          loader: 'jsx',
          contents: data
        };
      });
    }
  };
};
