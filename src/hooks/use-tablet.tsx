import * as React from "react";

const TABLET_MIN = 768; 
const TABLET_MAX = 1023; 

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TABLET_MAX}px)`);
    const onChange = () => {
      setIsTablet(mql.matches);
    };

    mql.addEventListener("change", onChange);
    setIsTablet(mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isTablet;
}
