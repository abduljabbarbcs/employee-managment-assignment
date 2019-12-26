import React from 'react';
import isNil from 'ramda/es/isNil';

export const useTransitionState = (ref: React.RefObject<HTMLElement>) => {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (isNil(el)) return;

    const start = () => setIsTransitioning(true);
    const end = () => setIsTransitioning(false);

    el.addEventListener('transitionstart', start);
    el.addEventListener('transitionend', end);

    return () => {
      el.removeEventListener('transitionstart', start);
      el.removeEventListener('transitionend', end);
    };
  }, [ref.current]);

  return isTransitioning;
};
