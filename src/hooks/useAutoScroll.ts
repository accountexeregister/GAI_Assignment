import { useEffect, useLayoutEffect, useRef } from 'react';

const SCROLL_THRESHOLD = 10;

function useAutoScroll(isActive: boolean) {
  const scrollContentRef = useRef(null);
  const isDisabled = useRef(false);
  const prevScrollTop = useRef<number | null>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
      if (!isDisabled.current && scrollHeight - clientHeight > scrollTop) {
        document.documentElement.scrollTo({
          top: scrollHeight - clientHeight,
          behavior: 'smooth'
        });
      }
    });

    if (scrollContentRef.current) {
      resizeObserver.observe(scrollContentRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!isActive) {
      isDisabled.current = true;
      return;
    }

    function onScroll() {
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
      if (
        !isDisabled.current &&
        prevScrollTop.current && window.scrollY < prevScrollTop.current &&
        scrollHeight - clientHeight > scrollTop + SCROLL_THRESHOLD
      ) {
        isDisabled.current = true;
      } else if (
        isDisabled.current &&
        scrollHeight - clientHeight <= scrollTop + SCROLL_THRESHOLD
      ) {
        isDisabled.current = false;
      }
      prevScrollTop.current = window.scrollY;
    }
    
    isDisabled.current = false;
    prevScrollTop.current = document.documentElement.scrollTop;
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [isActive]);

  return scrollContentRef;
}

export { useAutoScroll };