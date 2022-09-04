import React, { useEffect, useCallback, useRef, useState } from 'react';
import { bundleCode } from '../../utils/bundler';
import './compileCodeScreen.css';
import useAction from './../../hooks/useAction';
import useTypeSelector from '../../hooks/useTypeSelector';

interface CompileCodeScreenProps {
  userCode: string;
  id: string;
}

const iframeSrcDoc = `
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        const handleError = (err) => {
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime error:</h4>' + err + '</div>';
          console.error(err);
        }

        window.addEventListener('error', (e) => {
          e.preventDefault();
          handleError(e.error.message)
        })

        try {
          eval(event.data);
        } catch (err) {
          throw err;
        }
      }, false)
    </script>
    </body>
`;

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

const CompileCodeScreen: React.FC<CompileCodeScreenProps> = ({
  userCode,
  id
}) => {
  const iframeRef = useRef<any>(null);
  const cell = useTypeSelector((state) => state.cell.data[id]);
  const { startBundling, stopBundling } = useAction();

  const resetIframeContent = useCallback(() => {
    iframeRef.current.srcdoc = iframeSrcDoc;
  }, []);

  const handleCodeChange = useCallback(
    async (userCode: string) => {
      resetIframeContent();
      startBundling(id);

      const userCodeWithShowFunction = `${userCode} \n ${showFunctionScript}`;

      const result = await bundleCode(userCodeWithShowFunction);

      stopBundling(id, result.err);

      iframeRef.current.contentWindow.postMessage(result.code, '*');
    },
    [id, resetIframeContent, startBundling, stopBundling]
  );

  useEffect(() => {
    const bundleCode = setTimeout(() => handleCodeChange(userCode), 1000);

    return () => clearTimeout(bundleCode);
  }, [userCode, handleCodeChange]);

  return (
    <div className="compile-code-iframe-container">
      {cell.isLoading && (
        <div className="progress-cover">
          <progress
            className="progress is-small is-primary"
            max={100}
          ></progress>
        </div>
      )}

      <iframe
        className="compile-code-iframe"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={iframeSrcDoc}
        title="code preview"
      />
      {cell.error && <span className="compile-code-error">{cell.error}</span>}
    </div>
  );
};

export default CompileCodeScreen;
