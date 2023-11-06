import {ClockPage} from "@/pages/clock";
import {TimeSettings} from "@/settings";
import {JSX, useState} from "react";
import {AppControlRequest} from "@/pages/app";
import {Participants} from "@/pages/setup";

import styles from "@/styles/clock-switcher.module.scss";
import appStyles from "@/styles/app.module.scss";

export type ClockSwitcherProps = {
	timeSettings: TimeSettings;
	roleLabels: Participants;
	names: Participants;
	stateRequest: AppControlRequest;
	clockChanged: () => void;
};

export function ClockSwitcher(props: ClockSwitcherProps): JSX.Element {
	const {timeSettings, roleLabels, names, stateRequest, clockChanged} = props;

	const [currentClock, setCurrentClock] = useState<number>(0);

	const goToPreviousClock = () => {
		if (currentClock > 0) {
			setCurrentClock(currentClock - 1);
			clockChanged();
		}
	}

	const goToNextClock = () => {
		if (currentClock < timeSettings.rounds.length - 1) {
			setCurrentClock(currentClock + 1);
			clockChanged();
		}
	}

	// switch between the rounds and reset the clock on round change
	// at the top, a label for the current round is shown in the middle and two buttons (if applicable) at the sides of it
	// to switch the current clock
	return (
		<div className={styles.clockSwitcher}>
			<div className={styles.clockSwitcherHeader}>
				<div className={styles.clockSwitcherButton}>
					{(currentClock > 0) && <button
						className={appStyles.button}
						onClick={goToPreviousClock}
					>
						Atgal
					</button>}
				</div>
				<div className={styles.clockSwitcherLabel}>
					{currentClock + 1}. etapas
				</div>
				<div className={styles.clockSwitcherButton}>
					{(currentClock < timeSettings.rounds.length - 1) && <button
						className={appStyles.button}
						onClick={goToNextClock}
					>
						Toliau
					</button>}
				</div>
			</div>
			<div className={styles.clockArea}>
				<ClockPage
					roleLabels={roleLabels}
					names={names}
					time={timeSettings.rounds[currentClock] * 60}
					stateRequest={stateRequest}
				/>
			</div>
		</div>

	);
}
