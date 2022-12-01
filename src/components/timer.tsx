import { useEffect, useState } from "react";

export type TimerProps = {
  startTime: number;
  name: string;
  color: 'green' | 'darkred';
};

const timerStepMs = 100;

export function Timer(props: TimerProps): JSX.Element {
  const { startTime, name, color } = props;

  const [running, setRunning] = useState<boolean>(false);
  const [intervalRunner, setIntervalRunner] = useState<number | null>(null);

  const [timeLeftMs, setTimeLeftMs] = useState<number>(startTime * 1000);
  const [totalSeconds, setTotalSeconds] = useState<number>(startTime);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const startOrSuspend = () => {
    if (running) {
      const runnerId = intervalRunner;
      setIntervalRunner(null);
      clearInterval(runnerId!);
    } else {
      const runnerId = setInterval(() => {
        setTimeLeftMs((time) => time - timerStepMs);
      }, timerStepMs);
      setIntervalRunner(runnerId);
    }
    setRunning(!running);
  };

  useEffect(() => {
    setTotalSeconds(Math.ceil(timeLeftMs / 1000));
  }, [timeLeftMs]);

  useEffect(() => {
    const minutesLeft = totalSeconds > 0
      ? Math.floor(totalSeconds / 60) 
      : Math.ceil(totalSeconds / 60);
    const secondsLeft = totalSeconds % 60;

    setMinutes(minutesLeft);
    setSeconds(secondsLeft);
  }, [totalSeconds]);

  useEffect(() => {
    return () => {
      if (intervalRunner !== null) {
        clearTimeout(intervalRunner);
      }
    };
  }, []);

  return (
    <div className="card">
      <p className="timer-header" style={{color: color}}>{name}</p>
      <p className={"timer-value" + ((totalSeconds < 0) ? ' timer-overflow' : '')}>
        {totalSeconds < 0 && <span>-</span>}
        {minutes !== 0 && <span>{Math.abs(minutes)}m </span>}
        <span>{Math.abs(seconds)}s</span>
      </p>
      
      <button className="timer-switch" onClick={startOrSuspend}>
        {running ? "Stabdyti" : "Leisti"}
      </button>
    </div>
  );
}
