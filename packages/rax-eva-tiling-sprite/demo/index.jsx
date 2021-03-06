import {createElement, render} from 'rax';
import DriverUniversal from 'driver-universal';
import DriverEva from '@eva/driver-eva';
import {Eva} from '@eva/rax-eva';
import TilingSprite, {useTilingSpriteResource} from '@eva/rax-eva-tiling-sprite';

function App() {
  const resource = useTilingSpriteResource({
    image: 'https://gw.alicdn.com/tfs/TB1pHcJaycKOu4jSZKbXXc19XXa-84-85.png'
  });

  return (
    <Eva width={750} height={1334}>
      <scene>
        <TilingSprite
          resource={resource}
          tileScaleX={1.2}
          tileScaleY={1.2}
          tilePositionX={0}
          tilePositionY={0}
          anchorX={0.5}
          anchorY={0.5}
          originX={0.5}
          originY={0.5}
          width={84 * 5 * 1.2}
          height={85 * 8 * 1.2}
          y={-50}
        />
      </scene>
    </Eva>
  );
}

render(<App></App>, document.getElementById('root'), {
  driver: new DriverEva(DriverUniversal),
});
