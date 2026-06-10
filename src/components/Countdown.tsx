/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";

export default function Countdown() {
  // June 30th, 2026 at 13:00 (UTC/Local structure depending on requirement - let's set a defined Date object)
  const targetDate = new Date("2026-06-30T13:00:00");
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ended: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        ended: false,
      });
    };

    calculateTime();
    const id = setInterval(calculateTime, 1000);
    return () => clearInterval(id);
  }, []);

  const timeItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div id="workshop-countdown-element" className="my-8 max-w-lg mx-auto bg-white/70 backdrop-blur border border-brand-line/60 rounded-2xl p-4 shadow-sm text-center">
      <span className="text-[10px] font-mono tracking-widest text-brand-primary font-bold uppercase block mb-3">
        ⚡ COUNTDOWN TO THE WORKSHOP: JUNE 30, 2026 AT 13:00
      </span>
      <div className="flex gap-4 justify-center items-center">
        {timeItems.map((item, idx) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="w-12 h-14 sm:w-16 sm:h-16 bg-white border border-brand-line shadow-sm rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[50%] bg-[#FCFCFD]/80 border-b border-gray-100/60" />
              <span className="text-xl sm:text-2xl font-black text-brand-ink relative z-10 font-mono tracking-tight leading-none">
                {String(item.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[9px] font-mono font-bold text-gray-400 mt-1.5 tracking-wider uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
