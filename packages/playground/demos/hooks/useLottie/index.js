import {createElement, render, useEffect} from 'rax';
import DriverUniversal from 'driver-universal';
import DriverEva from '@eva/driver-eva';
import {Eva, useComponents} from '@eva/rax-eva';
import {useLottie, useLottieResource} from '@eva/rax-eva-lottie';

function App() {
  const resource = useLottieResource({
    json: 'https://g.alicdn.com/eva-assets/99727b6306d948a725e3622b38122796/0.0.1/tmp/lottie/5196aa44e991279ce93771eb1c5ecf7e/data.json',
  });

  const lottieComponent = useLottie({
    resource,
  });

  const components = useComponents(lottieComponent);

  useEffect(() => {
    lottieComponent.play([], {
      repeats: Infinity
    });
  }, [lottieComponent]);

  return (
    <Eva width="100%" height="100%">
      <scene>
        <gameobject
          resource={resource}
          components={components}
        />
      </scene>
    </Eva>
  );
}

render(<App></App>, document.getElementById('root'), {
  driver: new DriverEva(DriverUniversal, true),
});
