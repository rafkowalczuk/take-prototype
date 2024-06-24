import { DependencyList, EffectCallback, useEffect } from 'react';

const useAsyncEffect = (effect: EffectCallback | (() => Promise<void>), deps: DependencyList) => {
  useEffect(() => {
    (async () => {
      await effect();
    })();
  }, deps);
};

export { useAsyncEffect };
