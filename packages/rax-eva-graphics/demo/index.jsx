import {createElement, render, useCallback, useEffect, useRef} from 'rax';
import DriverUniversal from 'driver-universal';
import DriverEva from '@eva/driver-eva';
import {Eva} from '@eva/rax-eva';
import Graphics from '@eva/rax-eva-graphics';

function App() {
  const ref = useRef(null);

  const drawOutter = useCallback(context => {
    context.graphics.beginFill(0xde3249, 1);
    context.graphics.drawRoundedRect(0, 0, 300, 48, 24);
    context.graphics.endFill();
  }, []);

  const drawInner = useCallback((context, time = 0) => {
    const width = Math.max(40, Math.min(292, 292 * ((time % 5000) / 5000)));
    context.graphics.clear();
    context.graphics.beginFill(0x000000, 1);
    context.graphics.drawRoundedRect(0, 0, width, 40, 20);
    context.graphics.endFill();
  }, []);

  useEffect(() => {
    let lastTime = Date.now();
    function draw() {
      requestAnimationFrame(draw);
      drawInner(ref.current.Graphics, Date.now() - lastTime);
    }
    draw();
  }, []);

  return (
    <Eva width={750} height={1334}>
      <scene>
        <Graphics
          draw={drawOutter}
          anchorX={0.5}
          anchorY={0.5}
          originX={0.5}
          originY={0.5}
          width={300}
          height={48}
        />
        <Graphics
          ref={ref}
          draw={drawInner}
          anchorX={0.5}
          anchorY={0.5}
          originX={0.5}
          originY={0.5}
          width={292}
          height={40}
        />
      </scene>
    </Eva>
  );
}

render(<App></App>, document.getElementById('root'), {
  driver: new DriverEva(DriverUniversal),
});
