import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store';

const useAction = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(actionCreators, dispatch),
    [dispatch]
  );
};

export default useAction;
