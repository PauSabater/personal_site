import { Fragment } from "react"
import styles from "./TagLabels.module.scss"

export function TagLabels({ tags }: { tags: string[]}) {
    return (
        <Fragment>
            <div className={styles.labelContainer}>
                {tags.map((tag) => {
                    return <p>{tag}</p>
                })}

            </div>
        </Fragment>
    )
}