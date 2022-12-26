import { useEffect, useState } from "react";

import { ClockPage } from "@/pages/clock";
import { Participants, SetupPage } from "@/pages/setup";

import styles from "@/styles/app.module.scss";

const defaultTime = 1; // seconds

enum AppPage {
  SETUP,
  CLOCK,
}

export enum AppControlRequest {
  IDLE,
  RESET,
}

const participantLabels: Participants = {
  firstProponent: "Už 1",
  secondProponent: "Už 2",
  firstOpponent: "Prieš 1",
  secondOpponent: "Prieš 2",
};

export default function App(): JSX.Element {
  const [activePage, setActivePage] = useState<AppPage>(AppPage.SETUP);
  const [names, setNames] = useState<Participants | null>(null);
  const [minutes, setMinutes] = useState<number>(defaultTime);
  const [controlStateRequest, setControlStateRequest] =
    useState<AppControlRequest>(AppControlRequest.IDLE);

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
            stateRequest={controlStateRequest}
          />
        );
      case AppPage.CLOCK:
        return (
          <ClockPage
            time={minutes * 60}
            roleLabels={participantLabels}
            names={names}
            stateRequest={controlStateRequest}
          />
        );
    }
  };

  const onResetClick = () => {
    setControlStateRequest(AppControlRequest.RESET);
  };

  const backButton = (): JSX.Element => (
    <button
      className={styles.button}
      onClick={() => setActivePage(AppPage.SETUP)}
    >
      Atgal
    </button>
  );

  const resetButton = (): JSX.Element => (
    <button className={styles.button} onClick={onResetClick}>
      Atstatyti
    </button>
  );

  const wrapNavbarButton = (button: JSX.Element): JSX.Element => {
    return <ol>{button}</ol>;
  };

  const header = (): JSX.Element => (
    <nav className={styles.navBar}>
      {activePage !== AppPage.SETUP && wrapNavbarButton(backButton())}
      {wrapNavbarButton(resetButton())}
    </nav>
  );
  const mainBody = (): JSX.Element => (
    <main className={styles.main}>{resolvePage()}</main>
  );

  useEffect(() => {
    if (controlStateRequest === AppControlRequest.RESET) {
      setControlStateRequest(AppControlRequest.IDLE);
    }
  }, [controlStateRequest]);

  return (
    <div className={styles.root}>
      {header()}
      {mainBody()}
    </div>
  );
}
