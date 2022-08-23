import { ResizableBox } from 'react-resizable';
import './resizeableBox.css'

interface ResizeableBoxProps {
  direction: 'vertical' | 'horizontal';
  children: React.ReactNode;
}

const ResizeableBox: React.FC<ResizeableBoxProps> = ({
  direction,
  children
}) => {
  return (
    <ResizableBox width={300} height={600} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  );
};

export default ResizeableBox;
