import useAction from '../../hooks/useAction';
import CodeCell from '../CodeCell/CodeCell';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';
import useTypeSelector from './../../hooks/useTypeSelector';

const CellList = () => {
  const cellState = useTypeSelector((state) => state.cell);
  const { updateCell } = useAction();

  return (
    <>
      {cellState.order.length > 0 &&
        cellState.order.map((orderId) => {
          const cell = cellState.data[orderId];
          return (
            <div key={orderId}>
              {cell.type === 'code' && (
                <CodeCell
                  id={orderId}
                  content={cell.content}
                  updateCell={updateCell}
                />
              )}
              {cell.type === 'markdown' && (
                <MarkdownEditor
                  id={orderId}
                  content={cell.content}
                  updateCell={updateCell}
                />
              )}
            </div>
          );
        })}
    </>
  );
};

export default CellList;
