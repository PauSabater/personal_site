import styles from "./Button.module.scss"

export interface IBtnProps {
    text: string,
    href: string,
    color: string
}

export function Button({ btnProps }: { btnProps: IBtnProps}) {

    return (
        <button className={`${styles.btn} ${styles[btnProps.color]}`}>
            {btnProps.text}
        </button>
    )
}