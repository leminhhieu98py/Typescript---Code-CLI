import React from 'react';
import { Direction } from '../../store/actions';
import { CellType } from '../../store/interfaces';
import './actionBar.css';
interface ActionBarProps {
  id: string;
  isLastCell: boolean;
  deleteCell: (id: string) => {};
  moveCell: (id: string, direction: Direction) => {};
  insertCellAfter: (id: string, type: CellType) => {};
}

const ActionBar: React.FC<ActionBarProps> = ({
  id,
  isLastCell,
  deleteCell,
  moveCell,
  insertCellAfter
}) => {
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => insertCellAfter(id, 'markdown')}
      >
        <span className="icon">
          <i className="fas fa-book-bookmark"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => insertCellAfter(id, 'code')}
      >
        <span className="icon">
          <i className="fas fa-code"></i>
        </span>
      </button>
      {!isLastCell && (
        <>
          <button
            className="button is-primary is-small"
            onClick={() => moveCell(id, 'up')}
          >
            <span className="icon">
              <i className="fas fa-arrow-up"></i>
            </span>
          </button>
          <button
            className="button is-primary is-small"
            onClick={() => moveCell(id, 'down')}
          >
            <span className="icon">
              <i className="fas fa-arrow-down"></i>
            </span>
          </button>
          <button
            className="button is-primary is-small"
            onClick={() => deleteCell(id)}
          >
            <span className="icon">
              <i className="fas fa-times"></i>
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default ActionBar;
