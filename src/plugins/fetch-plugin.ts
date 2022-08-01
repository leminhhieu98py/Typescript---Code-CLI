import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';
import axios from 'axios';

export const fetchPlugin = (userCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // build.onLoad is trigger whenever a resolve is triggered -  I mean that the file is loaded
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: userCode
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
