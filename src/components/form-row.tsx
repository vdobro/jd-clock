import {JSX} from "react";

import styles from "@/styles/setup.module.scss";

export type FormRowProps = {
	label: string;
	fieldName: string;
	inputElement: JSX.Element;
};

export function FormRow(props: FormRowProps): JSX.Element {
	const { label, fieldName, inputElement } = props;

	return (
		<div className={styles.formRow}>
			<label htmlFor={fieldName}>{label}</label>
			{inputElement}
		</div>
	);
}
