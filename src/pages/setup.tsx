import { ChangeEvent, useEffect, useRef, useState } from "react";

import ToggleSwitch from "@/components/switch";

import styles from "@/styles/setup.module.scss";

export type Participants = {
  firstProponent: string;
  secondProponent: string;
  firstOpponent: string;
  secondOpponent: string;
};

type FormRowProps = {
  label: string;
  fieldName: string;
  inputElement: JSX.Element;
};
const FormRow = (props: FormRowProps): JSX.Element => {
  const { label, fieldName, inputElement } = props;

  return (
    <div className={styles.formRow}>
      <label htmlFor={fieldName}>{label}</label>
      {inputElement}
    </div>
  );
};

export enum InputControlRequest {
  IDLE,
  RESET,
}

type InputFieldProps = {
  label: string;
  fieldName: string;
  onValueChanged: (value: string) => void;
  initialValue?: string;
};

const InputField = (props: InputFieldProps): JSX.Element => {
  const { label, fieldName, onValueChanged, initialValue = "" } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChanged(event.target.value);
  };

  return (
    <FormRow
      label={label}
      fieldName={fieldName}
      inputElement={
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          required={true}
          name={fieldName}
          onChange={onInputChange}
          defaultValue={initialValue}
        />
      }
    />
  );
};

const emptyNames: Participants = {
  firstProponent: "",
  secondProponent: "",
  firstOpponent: "",
  secondOpponent: "",
};

export type SetupPageProps = {
  participantLabels: Participants;
  initialNames: Participants;
  useCustomNames: boolean;
  initialTimeSetting: number;
  onNameChanged: (names: Participants) => void;
  onTimeChanged: (minutes: number) => void;
};

export function SetupPage(props: SetupPageProps): JSX.Element {
  const {
    initialTimeSetting,
    initialNames,
    useCustomNames,
    onNameChanged,
    onTimeChanged,
  } = props;
  const [minutes, setMinutes] = useState<number>(initialTimeSetting);
  const [customNames, setCustomNames] = useState<boolean>(useCustomNames);
  const [names, setNames] = useState<Participants>(initialNames);

  const onNamesSwitchChanged = (value: boolean) => {
    setCustomNames(value);
    if (!value) {
      setNames(emptyNames);
    }
  };

  const formatParticipantLabel = (label: string): string => {
    return `"${label}" vardas:`;
  };

  const participantLabels: Participants = {
    firstProponent: formatParticipantLabel(
      props.participantLabels.firstProponent
    ),
    firstOpponent: formatParticipantLabel(
      props.participantLabels.firstOpponent
    ),
    secondProponent: formatParticipantLabel(
      props.participantLabels.secondProponent
    ),
    secondOpponent: formatParticipantLabel(
      props.participantLabels.secondOpponent
    ),
  };

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
        initialValue={initialTimeSetting + ""}
        onValueChanged={(value) =>
          setMinutes(Number.parseFloat(value.replace(",", ".")))
        }
      />
      <FormRow
        label="Naudoti dalyvių vardus?"
        fieldName="use_custom_names"
        inputElement={
          <ToggleSwitch
            round={true}
            initialValue={useCustomNames}
            onValueChange={onNamesSwitchChanged}
          />
        }
      />
      {customNames && (
        <>
          <InputField
            label={participantLabels.firstProponent}
            initialValue={initialNames.firstProponent}
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
            initialValue={initialNames.firstOpponent}
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
            initialValue={initialNames.secondProponent}
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
            initialValue={initialNames.secondOpponent}
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
    </form>
  );
}
