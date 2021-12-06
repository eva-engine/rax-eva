import {createElement, render} from 'rax';
import DriverUniversal from 'driver-universal';
import DriverEVA from '@eva/driver-eva';
import {Eva} from '@eva/rax-eva';

function App() {
  return (
    <Eva width='100%' height='100%'>
      <scene>
        <gameobject fill="#fff" fontSize={38}>
          Hello Rax EVA
        </gameobject>
      </scene>
    </Eva>
  );
}

render(<App />, document.getElementById('root'), {
  driver: new DriverEVA(DriverUniversal),
});
