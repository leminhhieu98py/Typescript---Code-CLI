import * as esbuild from 'esbuild-wasm';
import { ESBUILD_WASM_URL } from '../common/const';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

export const bundleCode = async (userCode: string) => {
  const service = await esbuild.startService({
    worker: true,
    wasmURL: ESBUILD_WASM_URL
  });

  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(userCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });
    return {
      code: result.outputFiles[0].text,
      err: ''
    };
  } catch (err: any) {
    return {
      code: '',
      err: err.message
    };
  }
};
