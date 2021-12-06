import {useContext} from 'rax';
import {instanceContext} from '../misc/context';

export default function useEva() {
  return useContext(instanceContext);
}
