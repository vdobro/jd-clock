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

const initialNames: Participants = {
  firstProponent: "",
  secondProponent: "",
  firstOpponent: "",
  secondOpponent: "",
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
            useCustomNames={names !== null}
            initialNames={names ?? initialNames}
            initialTimeSetting={defaultTime}
            onNameChanged={setNames}
            onTimeChanged={setMinutes}
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
      type="button"
    >
      Atgal
    </button>
  );

  const resetButton = (): JSX.Element => (
    <button className={styles.button} onClick={onResetClick} type="button">
      Atstatyti
    </button>
  );

  const nextButton = (): JSX.Element => {
    return (
      <button
        type="submit"
        className={styles.finish + " " + styles.button}
        onClick={() => setActivePage(AppPage.CLOCK)}
      >
        Pradėti
      </button>
    );
  };

  const wrapNavbarButton = (button: JSX.Element): JSX.Element => {
    return <li>{button}</li>;
  };

  const header = (): JSX.Element => (
    <nav className={styles.navBar}>
      <ul>
        {activePage !== AppPage.SETUP && wrapNavbarButton(backButton())}
        {wrapNavbarButton(resetButton())}
        {activePage === AppPage.SETUP && wrapNavbarButton(nextButton())}
      </ul>
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
      {mainBody()}
      {header()}
    </div>
  );
}
