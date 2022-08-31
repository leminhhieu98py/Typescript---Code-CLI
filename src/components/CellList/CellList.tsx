import useAction from '../../hooks/useAction';
import ActionBar from '../ActionBar/ActionBar';
import CodeCell from '../CodeCell/CodeCell';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';
import useTypeSelector from './../../hooks/useTypeSelector';
import './cellList.css';

const CellList = () => {
  const cellState = useTypeSelector((state) => state.cell);
  const { updateCell, deleteCell, moveCell } = useAction();

  return (
    <>
      {cellState.order.length > 0 &&
        cellState.order.map((id) => {
          const cell = cellState.data[id];
          return (
            <div className="cell-item-container" key={id}>
              <ActionBar id={id} deleteCell={deleteCell} moveCell={moveCell} />
              {cell.type === 'code' && (
                <CodeCell
                  id={id}
                  content={cell.content}
                  updateCell={updateCell}
                />
              )}
              {cell.type === 'markdown' && (
                <MarkdownEditor
                  id={id}
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
