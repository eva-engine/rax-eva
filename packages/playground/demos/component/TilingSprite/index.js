import {createElement, render} from 'rax';
import DriverUniversal from 'driver-universal';
import DriverEva from '@eva/driver-eva';
import {Eva} from '@eva/rax-eva';
import TilingSprite from '@eva/rax-eva-tiling-sprite';

function App() {
  return (
    <Eva width="100%" height="100%">
      <scene>
        <TilingSprite
          src="https://gw.alicdn.com/tfs/TB1pHcJaycKOu4jSZKbXXc19XXa-84-85.png"
          tileScaleX={1.5}
          tileScaleY={1.5}
          tilePositionX={0}
          tilePositionY={0}
          anchorX={0.5}
          anchorY={0.5}
          originX={0.5}
          originY={0.5}
          width={84 * 3 * 1.5}
          height={85 * 5 * 1.5}
          y={-50}
        />
      </scene>
    </Eva>
  );
}


render(<App />, document.getElementById('root'), {
  driver: new DriverEva(DriverUniversal)
});
