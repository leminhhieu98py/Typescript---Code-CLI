import { ResizableBox } from 'react-resizable';

interface ResizeableBoxProps {
  direction: 'vertical' | 'horizontal';
  children: React.ReactNode;
}

const ResizeableBox: React.FC<ResizeableBoxProps> = ({
  direction,
  children
}) => {
  return (
    <ResizableBox width={300} height={300} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  );
};

export default ResizeableBox;
