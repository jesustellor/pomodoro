import { useState, useEffect } from "react";

export default function Countdown() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [breakSec, setBreakSec] = useState(0);
  const [breakMin, setBreakMin] = useState(5);

  useEffect(() => {
    if (minutes >= 0) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0 && minutes >= 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }

        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds, minutes]);

  return (
    <div>
    <section>
      <p>Break Length</p><p>{breakMin}</p>
    </section>

    <section>
      <p>Session Length</p><p>{minutes}</p>
    </section>

    <section>
      Countdown: {minutes} : {seconds.toString().padStart(2, "0")}
    </section>
    </div>
  );
}