import { Timer } from "@/components/timer";
import { Participants } from "@/pages/setup";

import styles from '@/styles/clock.module.scss';

export type ClockPageProps = {
  time: number;
  roleLabels: Participants;
  names: Participants | null;
};

const proponentColor = "green";
const opponentColor = "darkred";

export function ClockPage(props: ClockPageProps): JSX.Element {
  const { time, roleLabels, names } = props;

  return (
    <>
      <div className={styles.container}>
        <Timer
          startTime={time}
          name={roleLabels.firstProponent} 
          color={proponentColor} />
        <Timer 
          startTime={time}
          name={roleLabels.firstOpponent} 
          color={opponentColor} />
      </div>
      <div className={styles.container}>
        <Timer
          startTime={time} 
          name={roleLabels.secondProponent}
          color={proponentColor} />
        <Timer
          startTime={time}
          name={roleLabels.secondOpponent}
          color={opponentColor} />
      </div>
    </>
  );
}
