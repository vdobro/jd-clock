import { Timer } from "../components/timer";
import { Participants } from "./setup";

import styles from '../styles/clock.module.css';

export type ClockPageProps = {
  time: number;
  roleLabels: Participants;
  names: Participants | null;
};

export function ClockPage(props: ClockPageProps): JSX.Element {
  const { time, roleLabels, names } = props;

  return (
    <>
      <div className={styles.container}>
        <Timer startTime={time} name={roleLabels.firstProponent} color="green" />
        <Timer startTime={time} name={roleLabels.firstOpponent} color="darkred" />
      </div>
      <div className={styles.container}>
        <Timer startTime={time} name={roleLabels.secondProponent} color="green" />
        <Timer startTime={time} name={roleLabels.secondOpponent} color="darkred" />
      </div>
    </>
  );
}
