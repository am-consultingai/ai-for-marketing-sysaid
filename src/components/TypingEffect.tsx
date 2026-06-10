/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";

interface TypingEffectProps {
  phrases: string[];
  speed?: number;
  eraseSpeed?: number;
  holdTime?: number;
}

export default function TypingEffect({
  phrases,
  speed = 85,
  eraseSpeed = 45,
  holdTime = 2000,
}: TypingEffectProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[index];

    if (isDeleting) {
      if (text.length === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
      } else {
        timer = setTimeout(() => {
          setText(text.substring(0, text.length - 1));
        }, eraseSpeed);
      }
    } else {
      if (text.length === currentPhrase.length) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, holdTime);
      } else {
        timer = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1));
        }, speed);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, phrases, speed, eraseSpeed, holdTime]);

  return (
    <span className="relative inline-block text-brand-primary font-black italic">
      {text}
      <span className="inline-block w-[3px] h-[0.9em] bg-brand-primary animate-pulse ml-1 align-middle" style={{ animationDuration: "1s" }} />
    </span>
  );
}
