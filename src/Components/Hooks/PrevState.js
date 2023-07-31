import { useRef, useEffect } from "react";

const PrevState = (term) => {

    const ref = useRef();
    const prevTerm = ref.current;
  
    useEffect(() => {
      ref.current = term;
    }, [term]);
  
  return prevTerm;
};

export default PrevState;
