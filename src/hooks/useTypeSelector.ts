import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';

const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypeSelector;
