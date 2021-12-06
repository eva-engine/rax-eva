import {
  createElement,
  useRef,
  useImperativeHandle,
  forwardRef,
  useMemo,
  memo,
  useLayoutEffect,
} from 'rax';
import {resource} from '@eva/eva.js';
import instance, {EvaInstance} from '../misc/instance';
import preload from '../misc/preload';
import {instanceContext, preloadContext} from '../misc/context';

function initInstance(ref) {
  instance.rootElement = ref.current;
  instance.canvasElement = instance.rootElement.querySelector(
    'canvas[eva-canvas=true]',
  );
  instance.backgroundElement = instance.rootElement.querySelector(
    'div[eva-bg=true]',
  );
  instance.hudElement = instance.rootElement.querySelector('div[eva-hud=true]');
  instance.gameInstance = instance.rootElement.gameInstance;
  instance.listeningProps = instance.rootElement.listeningProps;
}

function initPreload(
  preloadResources,
  preloadTimeout,
  onPreloadStart,
  onPreloadProgress,
  onPreloadLoaded,
  onPreloadComplete,
  onPreloadError,
) {
  onPreloadStart && preload.onStart(onPreloadStart);
  onPreloadProgress && preload.onProgress(onPreloadProgress);
  onPreloadLoaded && preload.onLoaded(onPreloadLoaded);
  onPreloadComplete && preload.onComplete(onPreloadComplete);
  onPreloadError && preload.onError(onPreloadError);

  const resources = [];

  if (preloadResources instanceof Array) {
    for (const res of preloadResources) {
      if (typeof res === 'object') {
        if (res.name !== undefined) {
          res.preload = true;
          resources.push(res);
          preload.resources[res.name] = res.name;
        } else {
          throw new Error(`"Name" prop is Necessary: ${JSON.stringify(res)}`);
        }
      } else {
        throw new Error(`Resource Data Should Be An Object: ${JSON.stringify(res)}`);
      }
    }
  } else if (typeof preloadResources === 'object') {
    for (const name in preloadResources) {
      const res = preloadResources[name];
      let resourceId;
      if (typeof res === 'object') {
        res.preload = true;
        resourceId = res.name;
        resources.push(res);
      } else if (typeof res === 'string') {
        resourceId = res;
      } else {
        throw new Error(`Resource Data Should Be An Object Or ResourceId: ${JSON.stringify(res)}`);
      }
      preload.resources[name] = resourceId;
    }
  } else {
    throw new Error(`Resource Data Should Be An Array or An Object: ${JSON.stringify(preloadResources)}`);
  }

  resource.addResource(resources);
  resource.timeout = preloadTimeout;
  resource.preload();
}

const Eva = forwardRef<EvaInstance, Record<string, any>>(
  (
    {
      preloadResources = [],
      preloadTimeout = 30 * 1000,
      onPreloadStart,
      onPreloadProgress,
      onPreloadLoaded,
      onPreloadComplete,
      onPreloadError,
      systems = [],
      listeningProps = [],
      children,
      ...props
    },
    ref,
  ) => {
    const _ref = useRef(null);

    useImperativeHandle(ref, () => instance, []);

    useMemo(() => {
      initPreload(
        preloadResources,
        preloadTimeout,
        onPreloadStart,
        onPreloadProgress,
        onPreloadLoaded,
        onPreloadComplete,
        onPreloadError,
      );
    }, []);

    useLayoutEffect(() => {
      initInstance(_ref);

      return () => {
        if (instance.gameInstance) {
          try {
            instance.gameInstance.pause();
            instance.gameInstance.destroy();
          } catch(e) {}
        }
      }
    }, []);

    const systemsMemo = useMemo(() => [...instance.systems, ...systems], []);

    const listeningPropsMemo = useMemo(() => [...instance.listeningProps, ...listeningProps], [])

    return (
      <instanceContext.Provider value={instance}>
        <preloadContext.Provider value={preload}>
          <eva {...props} ref={_ref} systems={systemsMemo} listeningProps={listeningPropsMemo}>
            {children as any}
          </eva>
        </preloadContext.Provider>
      </instanceContext.Provider>
    );
  },
);

export default memo(Eva);
