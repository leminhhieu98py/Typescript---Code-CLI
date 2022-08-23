import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizeableBox.css';

interface ResizableContainerProps {
  direction: 'vertical' | 'horizontal';
  children: React.ReactNode;
}

const ResizableContainer: React.FC<ResizableContainerProps> = ({
  direction,
  children
}) => {
  const resizeableProps: ResizableBoxProps =
    direction === 'vertical'
      ? {
          width: Infinity,
          height: 600,
          minConstraints: [Infinity, window.innerHeight * 0.1],
          maxConstraints: [Infinity, window.innerHeight * 0.9],
          resizeHandles: ['s']
        }
      : {
          width: 800,
          height: Infinity,
          minConstraints: [window.innerWidth * 0.1, Infinity],
          maxConstraints: [window.innerWidth * 0.9, Infinity],
          resizeHandles: ['e'],
          className: 'resize-horizontal'
        };

  return <ResizableBox {...resizeableProps}>{children}</ResizableBox>;
};

export default ResizableContainer;
