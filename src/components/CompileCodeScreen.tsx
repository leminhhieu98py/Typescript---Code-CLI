import React, { forwardRef } from 'react';

interface CompileCodeScreenProps {
  srcDoc: string;
}

const CompileCodeScreen = forwardRef<HTMLIFrameElement, CompileCodeScreenProps>(
  ({ srcDoc }, ref: React.Ref<HTMLIFrameElement>) => {
    return (
      <iframe
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        ref={ref}
        title="code preview"
      />
    );
  }
);

export default CompileCodeScreen;
