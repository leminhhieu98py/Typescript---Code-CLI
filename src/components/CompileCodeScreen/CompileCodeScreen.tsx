import React, { useRef } from 'react';
import './compileCodeScreen.css';
import useTypeSelector from '../../hooks/useTypeSelector';
import { useBundleCode } from './hooks/useBundleCode';

interface CompileCodeScreenProps {
  userCode: string;
  id: string;
}
//
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

const CompileCodeScreen: React.FC<CompileCodeScreenProps> = ({
  userCode,
  id
}) => {
  const iframeRef = useRef<any>(null);
  const cell = useTypeSelector((state) => state.cell.data[id]);
  useBundleCode(iframeRef, iframeSrcDoc, id, userCode);

  return (
    <div className="compile-code-iframe-container">
      {!!cell && cell.isLoading && (
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
      {!!cell && cell.error && (
        <span className="compile-code-error">{cell.error}</span>
      )}
    </div>
  );
};

export default CompileCodeScreen;
