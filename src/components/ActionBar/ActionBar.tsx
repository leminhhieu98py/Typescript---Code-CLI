import React from 'react';
import { Direction } from '../../store/actions';
import { CellType } from '../../store/interfaces/Cell';
import './actionBar.css';
interface ActionBarProps {
  id: string;
  deleteCell: (id: string) => {};
  moveCell: (id: string, direction: Direction) => {};
  insertCellBefore: (id: string, type: CellType) => {};
}

const ActionBar: React.FC<ActionBarProps> = ({
  id,
  deleteCell,
  moveCell,
  insertCellBefore
}) => {
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => insertCellBefore(id, 'markdown')}
      >
        <span className="icon">
          <i className="fas fa-book-bookmark"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => insertCellBefore(id, 'code')}
      >
        <span className="icon">
          <i className="fas fa-code"></i>
        </span>
      </button>
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
    </div>
  );
};

export default ActionBar;
