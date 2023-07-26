import { Fragment } from "react"
import styles from "./TagLabels.module.scss"

export function TagLabels({ tags }: { tags: string[]}) {
    return (
        <Fragment>
            <div className={styles.tagContainer}>
                {tags.map((tag) => {
                    return <p className={styles.tag}>{tag}</p>
                })}

            </div>
        </Fragment>
    )
}