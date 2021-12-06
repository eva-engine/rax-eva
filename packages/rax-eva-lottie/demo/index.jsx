import {createElement, render} from 'rax';
import DriverUniversal from 'driver-universal';
import DriverEva from '@eva/driver-eva';
import {Eva} from '@eva/rax-eva';
import Lottie, {useLottieResource} from '@eva/rax-eva-lottie';

document.title = 'rax-eva-lottie demo';

function App() {
  const resource = useLottieResource({
    json: 'https://g.alicdn.com/eva-assets/99727b6306d948a725e3622b38122796/0.0.1/tmp/lottie/5196aa44e991279ce93771eb1c5ecf7e/data.json',
  });

  return (
    <Eva width={750} height={1334}>
      <scene>
        <Lottie
          resource={resource}
          autoPlay={true}
        />
      </scene>
    </Eva>
  );
}

render(<App></App>, document.getElementById('root'), {
  driver: new DriverEva(DriverUniversal, true),
});
