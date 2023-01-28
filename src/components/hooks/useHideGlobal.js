import { useState, useEffect, useRef } from "react";

export default function useHideGlobal(setShow) {
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    // if hook has current and clicked target IS NOT the element than hide the element
    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false);
      // if hook has current and clicked target IS the element, flip show state
    } else if (ref.current && ref.current.contains(event.target)) {
      setShow((oldState) => !oldState);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return ref;
}
