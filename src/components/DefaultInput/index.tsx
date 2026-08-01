import styles from './styles.module.css';

type DefaultInputProps = {
    id: string
    labelText: string
} & React.ComponentProps<'input'>;
export function DefaultInput({ type, id, labelText, ...props }: DefaultInputProps) {
    return (
        <>
            <label htmlFor={id}>{labelText}</label>
            <input id={id} type={type} className={styles.input} {...props} />
        </>
    )
}