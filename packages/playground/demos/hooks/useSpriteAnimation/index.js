import {createElement, render, useCallback} from 'rax';
import DriverUniversal from 'driver-universal';
import DriverEva from '@eva/driver-eva';
import {Eva, useComponents} from '@eva/rax-eva';
import {
  useSpriteAnimationResource,
  useSpriteAnimation,
} from '@eva/rax-eva-sprite-animation';

document.title = 'rax-eva-sprite-animation demo';

function App() {
  const resource = useSpriteAnimationResource({
    image: {
      type: 'png',
      url: 'https://gw.alicdn.com/tfs/TB1n3LyFhn1gK0jSZKPXXXvUXXa-168-85.png',
    },
    json: {
      type: 'json',
      url:
        './json/e6250b5ddf5bad9cf5dbbeed7bb95896.json',
    },
  });

  const SpriteAnimation = useSpriteAnimation({
    resource,
    speed: 100,
    autoPlay: true
  });

  const components = useComponents(SpriteAnimation);

  const change = useCallback(() => {
    if (SpriteAnimation.speed > 50) {
      SpriteAnimation.speed -= 10;
    }
  }, []);

  return (
    <Eva width="100%" height="100%">
      <scene>
        <gameobject
          onClick={change}
          anchorX={0.5}
          anchorY={0.5}
          originX={0.5}
          originY={0.5}
          width={84}
          height={85}
          components={components}
        />
      </scene>
    </Eva>
  );
}

render(<App></App>, document.getElementById('root'), {
  driver: new DriverEva(DriverUniversal),
});
