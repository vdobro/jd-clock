import { JSX, useEffect, useState } from "react";

import styles from "@/styles/clock.module.scss";
import appStyles from "@/styles/app.module.scss";

export enum TimerStateRequest {
  IDLE,
  STOP,
}

export type TimerProps = {
  startTime: number;
  label: string;
  name: string | null;
  color: "green" | "darkred";
  stateRequest: TimerStateRequest;
};

const secondsInMinute = 60;
const timerStepMs = 100;

export function Timer(props: TimerProps): JSX.Element {
  const { startTime, label, name, color, stateRequest } = props;

  const [running, setRunning] = useState<boolean>(false);
  const [intervalRunner, setIntervalRunner] = useState<NodeJS.Timeout | null>(
    null
  );

  const initialTimerValue = startTime * 1000;
  const [timeLeftMs, setTimeLeftMs] = useState<number>(initialTimerValue);
  const [totalSeconds, setTotalSeconds] = useState<number>(startTime);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const resetTimer = () => {
    if (running) {
      startOrSuspend();
    }
    setTimeLeftMs(initialTimerValue);
  };

  const startOrSuspend = () => {
    if (running) {
      const runner: NodeJS.Timeout | null = intervalRunner;
      setIntervalRunner(null);
      clearInterval(runner!);
    } else {
      const runner: NodeJS.Timeout = setInterval(() => {
        setTimeLeftMs((time) => time - timerStepMs);
      }, timerStepMs);
      setIntervalRunner(runner);
    }
    setRunning(!running);
  };

  useEffect(() => {
    if (stateRequest === TimerStateRequest.STOP) {
      resetTimer();
    }
  }, [stateRequest]);

  useEffect(() => {
    setTotalSeconds(Math.ceil(timeLeftMs / 1000));
  }, [timeLeftMs]);

  useEffect(() => {
    const minutesLeft =
      totalSeconds > 0
        ? Math.floor(totalSeconds / secondsInMinute)
        : Math.ceil(totalSeconds / secondsInMinute);
    const secondsLeft = totalSeconds % secondsInMinute;

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
    <div className={styles.card}>
      <p className={styles.header} style={{ color: color }}>
        {name && <span>{name}</span>}
        <span>{label}</span>
      </p>
      <div
        className={
          styles.value + (totalSeconds < 0 ? ` ${styles.overflow}` : "")
        }
      >
        {totalSeconds < 0 && <span>-</span>}
        {minutes !== 0 && (
          <span className={styles.minutes}>{Math.abs(minutes)}m</span>
        )}
        <span>{Math.abs(seconds)}s</span>
      </div>

      <button
        className={appStyles.button}
        onClick={startOrSuspend}
        type="button"
      >
        {running ? "Stabdyti" : "Leisti"}
      </button>
    </div>
  );
}
