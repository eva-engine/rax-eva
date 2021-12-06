import {createElement, render, useCallback, useState} from 'rax';
import DriverUniversal from 'driver-universal';
import DriverEva from '@eva/driver-eva';
import {Eva} from '@eva/rax-eva';
import Image, {useImageResource} from '@eva/rax-eva-image';

document.title = 'rax-eva-image demo';

function App() {
  const resource1 = useImageResource({
    image: 'https://gw.alicdn.com/tfs/TB1pHcJaycKOu4jSZKbXXc19XXa-84-85.png'
  });

  const resource2 = useImageResource({
    image: 'https://gw.alicdn.com/tfs/TB1GfBpvUT1gK0jSZFhXXaAtVXa-84-85.png'
  });

  const [resource, setResource] = useState(resource1);

  const change = useCallback(() => {
    setResource(pre => {
      if (pre === resource1) {
        return resource2;
      } else {
        return resource1;
      }
    });
  }, []);

  return (
    <Eva width={750} height={1334}>
      <scene>
        <Image
          onClick={change}
          resource={resource}
          anchorX={0.5}
          anchorY={0.5}
          originX={0.5}
          originY={0.5}
          width={84}
          height={85}
        />
      </scene>
    </Eva>
  );
}

render(<App></App>, document.getElementById('root'), {
  driver: new DriverEva(DriverUniversal, true),
});
