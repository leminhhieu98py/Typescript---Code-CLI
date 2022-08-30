import { useEffect } from 'react';
import useAction from '../../hooks/useAction';
import CodeCell from '../CodeCell/CodeCell';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';
import useTypeSelector from './../../hooks/useTypeSelector';

const CellList = () => {
  const cellState = useTypeSelector((state) => state.cell);
  const { insertCellBefore } = useAction();
  
  useEffect(() => {
    insertCellBefore('1233', 'code');
  }, []);

  return (
    <>
      {cellState.order.length > 0 &&
        cellState.order.map((orderId) => {
          const cell = cellState.data[orderId];
          return (
            <div key={orderId}>
              {cell.type === 'code' && (
                <CodeCell id={orderId} content={cell.content} />
              )}
              {cell.type === 'markdown' && (
                <MarkdownEditor id={orderId} content={cell.content} />
              )}
            </div>
          );
        })}
    </>
  );
};

export default CellList;
