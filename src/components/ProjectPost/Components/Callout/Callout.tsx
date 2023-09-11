import styles from "./Callout.module.scss"

export function Callout({ text }: { text: string}) {
    return (
        <div className={styles.callout}>
            <p>{text}</p>
        </div>
    )
}