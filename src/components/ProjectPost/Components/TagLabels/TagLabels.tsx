import { Fragment } from "react"
import styles from "./TagLabels.module.scss"

export function TagLabels({ tags, color }: { tags: string[], color: string}) {
    return (
        <Fragment>
            <div className={styles.tagContainer}>
                {tags.map((tag) => {
                    return <p className={`${styles.tag} ${styles[color]}`}>{tag}</p>
                })}

            </div>
        </Fragment>
    )
}