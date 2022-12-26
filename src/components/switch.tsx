import { ChangeEvent, useEffect, useRef, useState } from "react";

import { InputControlRequest } from "@/pages/setup";

import styles from "@/styles/switch.module.scss";

export type ToggleSwitchProps = {
  initialValue: boolean;
  round: boolean;
  onValueChange: (value: boolean) => void;
  stateRequest: InputControlRequest;
};

export default function ToggleSwitch(props: ToggleSwitchProps): JSX.Element {
  const { initialValue, round, onValueChange, stateRequest } = props;
  const [value, setValue] = useState<boolean>(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    if (newValue !== value) {
      setValue(newValue);
    }
  };

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  useEffect(() => {
    if (stateRequest === InputControlRequest.RESET && inputRef.current) {
      inputRef.current.checked = initialValue;
      setValue(initialValue);
    }
  }, [stateRequest]);

  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        <input
          ref={inputRef}
          type="checkbox"
          onChange={onInputChange}
          defaultChecked={initialValue}
        />
        <span className={styles.slider + (round ? " " + styles.round : "")} />
      </label>
    </div>
  );
}
