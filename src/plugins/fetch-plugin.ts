import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';
import axios from 'axios';

const useCacheData = async (path: string) => {
  const cacheData = await localforage.getItem<esbuild.OnLoadResult>(path);
  const isCache = !!cacheData;
  return [isCache, cacheData];
};

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

      // Check whether data is cached
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cacheData = await localforage.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cacheData) {
          return cacheData;
        }
      });

      // Handle css files only
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const escapeContent = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
            const styleTag = document.createElement('style');
            styleTag.innerText = '${escapeContent}';
            document.head.appendChild(styleTag)
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await localforage.setItem(args.path, result);

        return result;
      });

      // Handle import module
      build.onLoad({ filter: /.*/ }, async (args: any) => {
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
