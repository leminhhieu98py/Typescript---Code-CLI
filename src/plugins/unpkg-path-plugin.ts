import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';
import { UNPACKAGE_URL } from '../utils/const';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // build.onResolve is to find out where is the file in our local system
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
              .href
          };
        }

        return { path: `${UNPACKAGE_URL}${args.path}`, namespace: 'a' };
      });

      // build.onLoad is trigger whenever a resolve is triggered -  I mean that the file is loaded
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('nested-test-pkg');
              console.log(message);
            `
          };
        }

        const cacheData = await localforage.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cacheData) {
          return cacheData;
        }

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await localforage.setItem(args.path, result);

        return result;
      });
    }
  };
};
