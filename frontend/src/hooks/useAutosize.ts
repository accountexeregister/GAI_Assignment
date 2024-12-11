import { useState, useLayoutEffect, useRef, RefObject } from "react";

/**
 * Hook to automatically resize the textarea's size based on its content to fit all the content.
 *
 * @param value - the value of the textarea
 * @returns a ref to the textarea element
 */
function useAutosize(value: string): RefObject<HTMLTextAreaElement> {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [borderWidth, setBorderWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const style = window.getComputedStyle(ref.current);
      setBorderWidth(
        parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth),
      );
    }
  }, []);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.height = "inherit";
      ref.current.style.height = `${ref.current.scrollHeight + borderWidth}px`;
    }
  }, [value, borderWidth]);

  return ref;
}

export { useAutosize };
