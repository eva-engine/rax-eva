import {useContext} from 'rax';
import {preloadContext} from '../misc/context';

export default function usePreload() {
  return useContext(preloadContext);
}
