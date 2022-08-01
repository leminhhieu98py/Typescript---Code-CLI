import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';
import axios from 'axios';

export const fetchPlugin = (userCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // build.onLoad is trigger whenever a resolve is triggered -  I mean that the file is loaded
      // Handle root entry of index.js file only
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: userCode
        };
      });

      // Handle import module
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // Check whether data is cached
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
