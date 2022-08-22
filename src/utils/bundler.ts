import * as esbuild from 'esbuild-wasm';
import { ESBUILD_WASM_URL } from '../common/const';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

export const startEsbuildService = async () => {
  return await esbuild.startService({
    worker: true,
    wasmURL: ESBUILD_WASM_URL
  });
};

export const compileCode = async (esbuildRef: any, userCode: string) => {
  return await esbuildRef.current.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(userCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window'
    }
  });
};
