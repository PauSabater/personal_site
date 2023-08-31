import styles from "./Rain.module.scss"

export function Rain(isSmall = false) {
    return (
        <div className={styles.rain} id="rain-container">
            {[...Array(400)].map((_, i) => <div key={`drop-${i}`} className={isSmall ? styles.dropSmall : styles.drop}></div>)}
        </div>
    )
}