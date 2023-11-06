import React, {ChangeEvent, JSX, useEffect, useRef, useState} from "react";
import styles from "@/styles/input-field.module.scss";
import {FormRow} from "@/components/form-row";

export type InputFieldProps = {
	label: string;
	fieldName: string;
	onValueChanged: (value: string) => void;
	initialValue?: string;
	type?: "string" | "number";
	onValidityChanged: (isValid: boolean) => void;
};

export function InputField(props: InputFieldProps): JSX.Element {
	const {
		label,
		fieldName,
		onValueChanged,
		initialValue = "",
		type = "string",
		onValidityChanged,
	} = props;

	const [textValue, setTextValue] = useState<string>(initialValue);
	const [valid, setValid] = useState<boolean>(true);

	const inputRef = useRef<HTMLInputElement>(null);

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTextValue(event.target.value);
		setValid(true);
	};

	const onBlur = () => {
		inputRef.current?.checkValidity();
		if (type === "number") {
			setValid(!Number.isNaN(parseFloat(textValue)));
		}
	};

	const onInvalid = () => {
		setValid(false);
	};

	useEffect(() => {
		onValueChanged(textValue);
	}, [textValue]);

	useEffect(() => {
		onValidityChanged(valid);
	}, [valid]);

	return (
		<FormRow
			label={label}
			fieldName={fieldName}
			inputElement={
				<>
					<input
						ref={inputRef}
						type="text"
						className={styles.input}
						required={true}
						name={fieldName}
						onChange={onInputChange}
						onBlur={onBlur}
						onInvalid={onInvalid}
						defaultValue={initialValue}
					/>
					{!valid && (
						<span style={{color: "red"}}>Klaidinga įvestis, pataisykite.</span>
					)}
				</>
			}
		/>
	);
}
