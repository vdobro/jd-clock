import {JSX, useEffect, useState} from "react";

import { Participants, SetupPage } from "@/pages/setup";
import {ClockSwitcher} from "@/pages/clock-switcher";

import styles from "@/styles/app.module.scss";
import {TimeSettings} from "@/settings";

const defaultTime: TimeSettings = {
  rounds: [1.5, 5, 1] // minutes
}

enum AppPage {
  SETUP,
  CLOCK,
}

export enum AppControlRequest {
  IDLE,
  RESET,
  VALIDATE,
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

function participantNamesNotEmpty(names: Participants): boolean {
    return (
        names.firstProponent.length > 0 ||
        names.secondProponent.length > 0 ||
        names.firstOpponent.length > 0 ||
        names.secondOpponent.length > 0
    );
}

export default function App(): JSX.Element {
  const [activePage, setActivePage] = useState<AppPage>(AppPage.SETUP);
  const [names, setNames] = useState<Participants>(initialNames);
  const [timeSettings, setTimeSettings] = useState<TimeSettings>(defaultTime);
  const [controlStateRequest, setControlStateRequest] =
    useState<AppControlRequest>(AppControlRequest.IDLE);
  const [setupValid, setSetupValid] = useState(true);

  const resolvePage = () => {
    switch (activePage) {
      case AppPage.SETUP:
        return (
          <SetupPage
            participantLabels={participantLabels}
            useCustomNames={participantNamesNotEmpty(names)}
            initialNames={names}
            initialTimeSetting={defaultTime}
            onNameChanged={setNames}
            onTimeChanged={setTimeSettings}
            onValidityChanged={setSetupValid}
          />
        );
      case AppPage.CLOCK:
        return (
          <ClockSwitcher
            timeSettings={timeSettings}
            roleLabels={participantLabels}
            names={names}
            stateRequest={controlStateRequest}
            clockChanged={() => setControlStateRequest(AppControlRequest.RESET)}
          />
        )
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

  const onNextClicked = () => {
    setControlStateRequest(AppControlRequest.VALIDATE);
    setTimeout(() => {
      setActivePage(AppPage.CLOCK);
    });
  }

  const nextButton = (): JSX.Element => {
    return (
      <button
        type="submit"
        disabled={!setupValid}
        className={styles.finish + " " + styles.button}
        onClick={onNextClicked}
      >
        Pradėti
      </button>
    );
  };

  const wrapNavbarButton = (button: JSX.Element): JSX.Element => {
    return <li>{button}</li>;
  };

  const navigation = (): JSX.Element => (
    <nav className={styles.navBar}>
      <ul>
        {activePage === AppPage.CLOCK && (
          <>
            {wrapNavbarButton(backButton())}
            {wrapNavbarButton(resetButton())}
          </>
        )}
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
      {navigation()}
    </div>
  );
}
