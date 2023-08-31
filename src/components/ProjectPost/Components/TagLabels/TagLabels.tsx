import { Fragment } from "react"
import styles from "./TagLabels.module.scss"

export function TagLabels({ tags, color }: { tags: string[], color: string}) {
    return (
        <Fragment>
            <div className={styles.tagContainer}>
                {tags.map((tag, i) => {
                    return <p className={`${styles.tag} ${styles[color]}`} data-tag-label="" key={`tag-${i}`}>{tag}</p>
                })}

            </div>
        </Fragment>
    )
}