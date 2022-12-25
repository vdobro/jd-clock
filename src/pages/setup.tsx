import { ChangeEvent, useEffect, useState } from "react";

import styles from "@/styles/setup.module.scss";
import appStyles from "@/styles/app.module.scss";

export type Participants = {
  firstProponent: string;
  secondProponent: string;
  firstOpponent: string;
  secondOpponent: string;
};

type InputFieldProps = {
  label: string;
  fieldName: string;
  onValueChanged: (value: string) => void;
  initialValue?: string | number;
};

const InputField = (props: InputFieldProps): JSX.Element => {
  const {
    label,
    fieldName,
    onValueChanged,
    initialValue = "",
  } = props;

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChanged(event.target.value);
  };

  return (
    <div className={styles.formRow}>
      <label htmlFor={fieldName}>{label}</label>
      <input
        type="text"
        required={true}
        name={fieldName}
        onChange={onInputChange}
        defaultValue={initialValue}
       />
    </div>
  );
};

export type SetupPageProps = {
  participantLabels: Participants;
  initialTimeSetting: number;
  onNameChanged: (names: Participants) => void;
  onTimeChanged: (minutes: number) => void;
  onFinished: () => void;
};

export function SetupPage(props: SetupPageProps): JSX.Element {
  const {
    participantLabels,
    initialTimeSetting,
    onNameChanged,
    onTimeChanged,
    onFinished,
  } = props;
  const [minutes, setMinutes] = useState<number>(initialTimeSetting);
  const [customNames, setCustomNames] = useState<boolean>(true);
  const [names, setNames] = useState<Participants>({
    firstProponent: "",
    secondProponent: "",
    firstOpponent: "",
    secondOpponent: "",
  });

  useEffect(() => {
    onNameChanged(names);
  }, [names]);

  useEffect(() => {
    onTimeChanged(minutes);
  }, [minutes]);

  return (
    <form className={styles.form}>
      <InputField
        label="Kiek minučių?"
        fieldName="minutes"
        initialValue={1}
        onValueChanged={(value) => setMinutes(Number.parseFloat(value.replace(',', '.')))}
      />
      {customNames && (
        <>
          <InputField
            label={participantLabels.firstProponent}
            fieldName="pro1"
            onValueChanged={(name: string) =>
              setNames({
                ...names,
                firstProponent: name,
              })
            }
          />

          <InputField
            label={participantLabels.firstOpponent}
            fieldName="contra1"
            onValueChanged={(name: string) =>
              setNames({
                ...names,
                firstOpponent: name,
              })
            }
          />

          <InputField
            label={participantLabels.secondProponent}
            fieldName="pro2"
            onValueChanged={(name: string) =>
              setNames({
                ...names,
                secondProponent: name,
              })
            }
          />

          <InputField
            label={participantLabels.secondOpponent}
            fieldName="contra2"
            onValueChanged={(name: string) =>
              setNames({
                ...names,
                secondOpponent: name,
              })
            }
          />
        </>
      )}
      <button
        className={styles.finish + ' ' + appStyles.button} 
        onClick={onFinished}>Pradėti</button>
    </form>
  );
}
