import {createElement, render, useCallback, useEffect, useRef} from 'rax';
import DriverUniversal from 'driver-universal';
import DriverEva from '@eva/driver-eva';
import {
  Eva,
  useComponents
} from '@eva/rax-eva';
import {useImage, useImageResource} from '@eva/rax-eva-image';
import Transition from '@eva/rax-eva-transition';

document.title = 'rax-eva-transition demo';

function App() {
  const startSrc = useImageResource({
    image: '//gw.alicdn.com/tfs/TB1Gbb.ONv1gK0jSZFFXXb0sXXa-159-44.png'
  });

  const startComponent = useImage({
    resource: startSrc
  });

  const components = useComponents(startComponent);

  const ref = useRef(null);

  const initial = useCallback(({Transform}) => {
    return {
      idle: [
        {
          name: 'scale.x',
          component: Transform,
          values: [
            {
              time: 0,
              value: 1,
              tween: 'ease-out',
            },
            {
              time: 400,
              value: 1.2,
              tween: 'ease-in',
            },
            {
              time: 800,
              value: 1,
            },
          ],
        },
        {
          name: 'scale.y',
          component: Transform,
          values: [
            {
              time: 0,
              value: 1,
              tween: 'ease-out',
            },
            {
              time: 400,
              value: 1.2,
              tween: 'ease-in',
            },
            {
              time: 800,
              value: 1,
            },
          ],
        },
      ],
      bounce: [
        {
          name: 'position.y',
          component: Transform,
          values: [
            {
              time: 0,
              value: 0,
              tween: 'ease-out',
            },
            {
              time: 50,
              value: 40,
              tween: 'ease-in',
            },
            {
              time: 150,
              value: -40,
              tween: 'ease-out',
            },
            {
              time: 200,
              value: 0,
            },
          ],
        },
      ],
    };
  }, []);

  useEffect(() => {
    ref.current.play('idle', Infinity);
  }, []);

  const change = useCallback(() => {
    ref.current.once('finish', () => {
      location.href = 'https://yuque.com/eva/rax-eva/intro';
    }).play('bounce', 1);
  }, []);

  return (
    <Eva width={750} height={1334}>
      <scene>
        <Transition
          ref={ref}
          onClick={change}
          initial={initial}
          anchorX={0.5}
          anchorY={0.5}
          originX={0.5}
          originY={0.5}
          width={318}
          height={88}
          components={components}
        />
      </scene>
    </Eva>
  );
}

render(<App></App>, document.getElementById('root'), {
  driver: new DriverEva(DriverUniversal, true),
});
