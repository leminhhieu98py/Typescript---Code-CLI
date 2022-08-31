import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizableContainer.css';

interface ResizableContainerProps {
  direction: 'vertical' | 'horizontal';
  children: React.ReactNode;
  widthPercent?: number;
  heightPercent?: number;
}

const DEFAULT_WIDTH_PERCENT = 0.5;
const DEFAULT_HEIGHT_PERCENT = 0.4;
const MIN_CONSTRAINT = 0.1;
const MAX_CONSTRAINT = 0.9;

const ResizableContainer: React.FC<ResizableContainerProps> = ({
  direction,
  children,
  widthPercent = DEFAULT_WIDTH_PERCENT,
  heightPercent = DEFAULT_HEIGHT_PERCENT
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
          height: windowHeight * heightPercent,
          minConstraints: [Infinity, windowHeight * MIN_CONSTRAINT],
          maxConstraints: [Infinity, windowHeight * MAX_CONSTRAINT],
          resizeHandles: ['s']
        }
      : {
          width: windowWidth * widthPercent,
          height: Infinity,
          minConstraints: [windowWidth * MIN_CONSTRAINT, Infinity],
          maxConstraints: [windowWidth * MAX_CONSTRAINT, Infinity],
          resizeHandles: ['e'],
          className: 'resize-horizontal'
        };

  return <ResizableBox {...resizeableProps}>{children}</ResizableBox>;
};

export default ResizableContainer;
