import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypedTextProps {
  strings: string[];
  onComplete?: () => void; // New prop to handle completion
}

const TypedText: React.FC<TypedTextProps> = ({ strings, onComplete }) => {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const options = {
      strings,
      typeSpeed: 50,
      backSpeed: 50,
      onComplete: () => {
        if (onComplete) {
          onComplete();
        }
      },
    };

    // Initialize Typed with options including onComplete callback
    const typed = new Typed(el.current!, options);

    return () => {
      typed.destroy();
    };
  }, [strings, onComplete]);

  return <span ref={el} />;
};

export default TypedText;
