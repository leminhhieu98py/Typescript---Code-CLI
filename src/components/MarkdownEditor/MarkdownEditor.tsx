import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const MarkdownEditor = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const mdEditorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleToggleEditMode = (e: MouseEvent) => {
      if (
        mdEditorRef.current &&
        e.target &&
        mdEditorRef.current.contains(e.target as Node)
      ) {
        setIsEditing(true);
        return;
      }

      setIsEditing(false);
    };
    window.addEventListener('click', handleToggleEditMode, { capture: true });

    return () =>
      window.removeEventListener('click', handleToggleEditMode, {
        capture: true
      });
  }, []);

  return (
    <div ref={mdEditorRef}>
      {isEditing ? <MDEditor /> : <MDEditor.Markdown source="# hello" />}
    </div>
  );
};

export default MarkdownEditor;
