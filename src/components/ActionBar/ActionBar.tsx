import React from 'react';
import { Direction } from '../../store/actions';

interface ActionBarProps {
  id: string;
  deleteCell: (id: string) => {};
  moveCell: (id: string, direction: Direction) => {};
}

const ActionBar: React.FC<ActionBarProps> = ({ id, deleteCell, moveCell }) => {
  return (
    <div>
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
