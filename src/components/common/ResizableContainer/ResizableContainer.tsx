import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizableContainer.css';

interface ResizableContainerProps {
  direction: 'vertical' | 'horizontal';
  children: React.ReactNode;
}

const ResizableContainer: React.FC<ResizableContainerProps> = ({
  direction,
  children
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    let resizeTimer: any;

    const windowResizeHandler = () => {
      if (resizeTimer) clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      }, 100);
    };

    window.addEventListener('resize', windowResizeHandler);

    return () => {
      window.removeEventListener('resize', windowResizeHandler);
    };
  }, []);

  const resizeableProps: ResizableBoxProps =
    direction === 'vertical'
      ? {
          width: Infinity,
          height: windowHeight * 0.75,
          minConstraints: [Infinity, windowHeight * 0.1],
          maxConstraints: [Infinity, windowHeight * 0.9],
          resizeHandles: ['s']
        }
      : {
          width: windowWidth * 0.75,
          height: Infinity,
          minConstraints: [windowWidth * 0.1, Infinity],
          maxConstraints: [windowWidth * 0.9, Infinity],
          resizeHandles: ['e'],
          className: 'resize-horizontal'
        };

  return <ResizableBox {...resizeableProps}>{children}</ResizableBox>;
};

export default ResizableContainer;
