import React, { useCallback, useEffect } from 'react';

import useAction from './../../../hooks/useAction';
import { bundleCode } from './../../../utils/bundler';

const showFunctionScript = `
import _React from 'react';
import _ReactDOM from 'react-dom';

function show(value){
  var rootNode = document.getElementById('root');
  var insertLineBreak = () => rootNode.insertAdjacentHTML('afterend', '<br />')

  if(value.$$typeof){
    const root = _ReactDOM.createRoot(rootNode);
    root.render(value);
  } 
  else if(typeof value === 'object'){
    rootNode.insertAdjacentHTML('afterend', JSON.stringify(value));
    insertLineBreak();
  }
  else {
    rootNode.insertAdjacentHTML('afterend', value);
    insertLineBreak();
  }
}
`;

export const useBundleCode = (
  iframeRef: React.RefObject<HTMLIFrameElement>,
  iframeSrcDoc: string,
  id: string,
  userCode: string
) => {
  const { startBundling, stopBundling } = useAction();

  const resetIframeContent = useCallback(() => {
    if (iframeRef.current?.srcdoc) {
      iframeRef.current.srcdoc = iframeSrcDoc;
    }
  }, [iframeRef, iframeSrcDoc]);

  const handleCodeChange = useCallback(
    async (userCode: string) => {
      resetIframeContent();
      startBundling(id);

      const userCodeWithShowFunction = `${userCode} \n ${showFunctionScript}`;

      const result = await bundleCode(userCodeWithShowFunction);

      stopBundling(id, result.err);
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow?.postMessage(result.code, '*');
      }
    },
    [id, iframeRef, resetIframeContent, startBundling, stopBundling]
  );

  useEffect(() => {
    const bundleCode = setTimeout(() => handleCodeChange(userCode), 1000);

    return () => clearTimeout(bundleCode);
  }, [userCode, handleCodeChange]);
};
