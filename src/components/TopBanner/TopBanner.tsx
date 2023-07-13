import { Fragment } from "react"
import styles from "./TopBanner.module.scss"

export function TopBanner({ title, lines }: { title: string, lines: string[]}) {
    return (
        <Fragment>
            <div className={styles.container} >
                <div className={styles.wrapp} >
                    <p className={styles.preTitle}>frontend dev</p>
                    <p className={styles.title}>giving light</p>
                    <p className={styles.title}>to ideas</p>
                </div>
                <div className={styles['date']} >
                    <div className={styles['date__container']} >
                        <p className={styles['date__date']}>03</p>
                        <div className={styles['date__text-container']}>
                            <p className={styles['date__month']}>Jul</p>
                            <p className={styles['date__month']}>Available</p>
                            <p className={styles['date__month']}>for work</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}