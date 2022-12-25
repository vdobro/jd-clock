import { useState } from "react";

import { ClockPage } from "@/pages/clock";
import { Participants, SetupPage } from "@/pages/setup";

import styles from "@/styles/app.module.scss";

const defaultTime = 1.5; // seconds

enum AppPage {
  SETUP,
  CLOCK,
}

const participantLabels: Participants = {
  firstProponent: "Už 1",
  secondProponent: "Už 2",
  firstOpponent: "Prieš 1",
  secondOpponent: "Prieš 2",
};

export default function App(): JSX.Element {
  const [activePage, setActivePage] = useState<AppPage>(AppPage.SETUP);
  const [names, setNames] = useState<Participants | null >(null);
  const [minutes, setMinutes] = useState<number>(defaultTime);

  const resolvePage = () => {
    switch (activePage) {
      case AppPage.SETUP:
        return (
          <SetupPage
            participantLabels={participantLabels}
            initialTimeSetting={defaultTime}
            onNameChanged={setNames}
            onTimeChanged={setMinutes}
            onFinished={() => setActivePage(AppPage.CLOCK)}
          />
        );
      case AppPage.CLOCK:
        return (
          <ClockPage
            time={minutes * 60}
            roleLabels={participantLabels}
            names={names}
          />
        );
    }
  };

  const backButton = (): JSX.Element => {
    if (activePage !== AppPage.SETUP) {
      return <button
        className={styles.button}
        onClick={() => setActivePage(AppPage.SETUP)}>
          Atgal
      </button>;
    } else return <></>;
  };

  const header = (): JSX.Element => (
    <nav>
      <ol>{backButton()}</ol>
    </nav>
  );
  const mainBody = (): JSX.Element => <main>{resolvePage()}</main>;

  return (
    <div className={styles.root}>
      {header()}
      {mainBody()}
    </div>
  );
}
