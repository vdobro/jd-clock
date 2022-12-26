import { useEffect, useState } from "react";

import { AppControlRequest } from "@/app";
import { Timer, TimerStateRequest } from "@/components/timer";
import { Participants } from "@/pages/setup";

import styles from "@/styles/clock.module.scss";

export type ClockPageProps = {
  time: number;
  roleLabels: Participants;
  names: Participants | null;
  stateRequest: AppControlRequest;
};

const proponentColor = "green";
const opponentColor = "darkred";

export function ClockPage(props: ClockPageProps): JSX.Element {
  const { time, roleLabels, names, stateRequest } = props;

  const [timerStateRequest, setTimerStateRequest] = useState<TimerStateRequest>(
    TimerStateRequest.IDLE
  );

  useEffect(() => {
    switch (stateRequest) {
      case AppControlRequest.IDLE:
        setTimerStateRequest(TimerStateRequest.IDLE);
        break;
      case AppControlRequest.RESET:
        setTimerStateRequest(TimerStateRequest.STOP);
        break;
    }
  }, [stateRequest]);
  return (
    <>
      <div className={styles.container}>
        <Timer
          startTime={time}
          label={roleLabels.firstProponent}
          name={names?.firstProponent ?? null}
          color={proponentColor}
          stateRequest={timerStateRequest}
        />
        <Timer
          startTime={time}
          label={roleLabels.firstOpponent}
          name={names?.firstOpponent ?? null}
          color={opponentColor}
          stateRequest={timerStateRequest}
        />
      </div>
      <div className={styles.container}>
        <Timer
          startTime={time}
          label={roleLabels.secondProponent}
          name={names?.secondProponent ?? null}
          color={proponentColor}
          stateRequest={timerStateRequest}
        />
        <Timer
          startTime={time}
          label={roleLabels.secondOpponent}
          name={names?.secondOpponent ?? null}
          color={opponentColor}
          stateRequest={timerStateRequest}
        />
      </div>
    </>
  );
}
