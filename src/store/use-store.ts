import { useContext } from 'react';
import Store from './context';

export const useStore = () => {
  return useContext(Store);
}