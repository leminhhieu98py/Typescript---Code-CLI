import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './markdownEditor.css';

const MarkdownEditor = () => {
  const [content, setContent] = useState<string>('');
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
    <div className="text-editor" ref={mdEditorRef}>
      {isEditing ? (
        <MDEditor value={content} onChange={(e) => setContent(e as string)} />
      ) : (
        <MDEditor.Markdown source={content ? content : `### Start to write a document here`} />
      )}
    </div>
  );
};

export default MarkdownEditor;
