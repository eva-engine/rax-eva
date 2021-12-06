import {createElement, render, useCallback, useState} from 'rax';
import DriverUniversal from 'driver-universal';
import DriverEva from '@eva/driver-eva';
import {Eva} from '@eva/rax-eva';
import SpriteAnimation, {
  useSpriteAnimationResource,
} from '@eva/rax-eva-sprite-animation';

function App() {
  const [speed, setSpeed] = useState(100);

  const resource = useSpriteAnimationResource({
    image: 'https://gw.alicdn.com/tfs/TB1n3LyFhn1gK0jSZKPXXXvUXXa-168-85.png',
    json: './public/json/e6250b5ddf5bad9cf5dbbeed7bb95896.json',
  });

  const change = useCallback(() => {
    setSpeed(pre => {
      if (pre > 50) {
        pre -= 10;
      }
      return pre;
    });
  }, []);

  return (
    <Eva width={750} height={1334}>
      <scene>
        <SpriteAnimation
          resource={resource}
          speed={speed}
          onClick={change}
          anchorX={0.5}
          anchorY={0.5}
          originX={0.5}
          originY={0.5}
          width={84}
          height={85}
          autoPlay={true}
        />
      </scene>
    </Eva>
  );
}

render(<App></App>, document.getElementById('root'), {
  driver: new DriverEva(DriverUniversal),
});
