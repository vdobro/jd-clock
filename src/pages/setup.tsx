import { JSX, useEffect, useState } from "react";

import {TimeSettings} from "@/settings";
import ToggleSwitch from "@/components/switch";

import styles from "@/styles/setup.module.scss";
import {FormRow} from "@/components/form-row";
import {InputField} from "@/components/input-field";
import {TimeSetup} from "@/pages/time-setup";

export type Participants = {
  firstProponent: string;
  secondProponent: string;
  firstOpponent: string;
  secondOpponent: string;
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
  initialTimeSetting: TimeSettings;
  onNameChanged: (names: Participants) => void;
  onTimeChanged: (timeSettings: TimeSettings) => void;
  onValidityChanged: (isValid: boolean) => void;
};

export function SetupPage(props: SetupPageProps): JSX.Element {
  const {
    initialTimeSetting,
    initialNames,
    useCustomNames,
    onNameChanged,
    onTimeChanged,
    onValidityChanged,
  } = props;
  const [customNames, setCustomNames] = useState<boolean>(useCustomNames);
  const [names, setNames] = useState<Participants>(initialNames);
  const [invalidFields, setInvalidFields] = useState<number>(0);

  const onNamesSwitchChanged = (value: boolean) => {
    setCustomNames(value);
    if (!value) {
      setNames(emptyNames);
    }
  };

  const formatParticipantLabel = (label: string): string => {
    return `"${label}" vardas:`;
  };

  const onInputValidityChanged = (isValid: boolean): void => {
    if (isValid) {
      if (invalidFields > 0) {
        setInvalidFields(invalidFields - 1);
      }
    } else {
      setInvalidFields(invalidFields + 1);
    }
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
    if (invalidFields === 0) {
      onValidityChanged(true);
    } else if (invalidFields === 1) {
      onValidityChanged(false); // only the first invalid field is interesting
    }
  }, [invalidFields]);

  return (
    <form className={styles.form}>
      <TimeSetup
        initialTimeSetting={initialTimeSetting}
        onTimeChanged={onTimeChanged}
        onValidityChanged={onValidityChanged} />
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
            onValidityChanged={onInputValidityChanged}
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
            onValidityChanged={onInputValidityChanged}
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
            onValidityChanged={onInputValidityChanged}
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
            onValidityChanged={onInputValidityChanged}
          />
        </>
      )}
    </form>
  );
}
