import { RefObject, useEffect, useState } from "react";

const useOnScreen = (ref: RefObject<HTMLDivElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  });

  return isIntersecting;
};

export default useOnScreen;
