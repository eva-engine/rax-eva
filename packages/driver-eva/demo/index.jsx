import {createElement, render, useState, useCallback, Fragment} from 'rax';
import DriverUniversal from 'driver-universal';
import DriverEva from '@eva/driver-eva';

document.title = 'driver-eva demo';

function App() {
  const [remove, setRemove] = useState(false);
  const [alpha, setAlpha] = useState(1);
  const [scale, setScale] = useState(1);

  const clicked = useCallback(() => {
    setAlpha(pre => {
      if (pre === 1) {
        return 0.5;
      } else {
        return 1;
      }
    });
    setScale(pre => {
      if (pre === 1) {
        return 1.2;
      } else {
        return 1;
      }
    });
  }, []);

  const toggle = useCallback(() => {
    setRemove(pre => !pre);
  }, []);

  return (
    <Fragment>
      <eva width={750} height={1334} transparent={true}>
        <background style={{background: '#000', display: 'flex', 'justify-content': 'center', 'align-items': 'flex-start'}}>
          <img src="//gw.alicdn.com/tfs/TB1c16edmR26e4jSZFEXXbwuXXa-357-72.png" style={{width: 600, marginTop: 500}}/>
        </background>
        <scene>
        {!remove ?
          <gameobject
            onClick={clicked}
            anchorX={0.5}
            anchorY={0.5}
            scaleX={scale}
            scaleY={scale}
            originX={0.5}
            originY={0.5}
            scaleX={scale}
            scaleY={scale}
            fill="#fff"
            fontSize={38}
            alpha={alpha}
          >
            用于开发互动的Rax解决方案
          </gameobject>
        : null}
        </scene>
        <hud style={{display: 'flex', 'justify-content': 'center', 'align-items': 'flex-end'}}>
          <div style={{marginBottom: 500}} onClick={toggle}>
            <img src="//gw.alicdn.com/tfs/TB1Gbb.ONv1gK0jSZFFXXb0sXXa-159-44.png" />
          </div>
        </hud>
      </eva>
    </Fragment>
  );
}

render(<App></App>, document.getElementById('root'), {
  driver: new DriverEva(DriverUniversal, true),
});
