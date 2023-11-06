import {JSX} from "react";
import {InputField} from "@/components/input-field";
import {TimeSettings} from "@/settings";

export type TimeSetupProps = {
	initialTimeSetting: TimeSettings;
	onTimeChanged: (timeSettings: TimeSettings) => void;
	onValidityChanged: (isValid: boolean) => void;
};

export function TimeSetup(props: TimeSetupProps): JSX.Element {
	const {initialTimeSetting, onTimeChanged, onValidityChanged} = props;

	const onInputValidityChanged = (isValid: boolean): void => {
		onValidityChanged(isValid);
	}

	const setRoundDuration = (roundIndex: number, durationString: string): void => {
		const parsedValue: number = Number.parseFloat(durationString.replace(",", "."));
		const newTimeSettings = {...initialTimeSetting};
		newTimeSettings.rounds[roundIndex] = parsedValue;
		onTimeChanged(newTimeSettings);
	}

	return <>{
		initialTimeSetting.rounds.map((roundDuration: number, round: number) => {
			const roundLabel = `${round + 1}. etapo trukmė (min.)`;
			return (<InputField
				key={round}
				label={roundLabel}
				type="number"
				fieldName="minutes"
				initialValue={roundDuration + ""}
				onValueChanged={(value: string) => setRoundDuration(round, value)}
				onValidityChanged={onInputValidityChanged}
			/>)
		})}</>;
}
