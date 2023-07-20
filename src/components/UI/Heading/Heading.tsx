import { Fragment } from "react"
import styles from "./Heading.module.scss"


export interface IHeadingProps {
    text: string | string[],
    align: string
}

export function Heading({ props }: { props: IHeadingProps}): JSX.Element {

    if (Array.isArray(props.text) === false) {
        return (
            <h1 className={`${styles.heading} ${styles[props.align]}`}>
                {props.text}
            </h1>
        )
    } else {
        return (
            <Fragment>
                {(props.text as string[]).map((line) => {
                    return <div className={styles.lineContainer}>
                        <h1 className={`${styles.heading} ${styles[props.align]}`}>
                            {line}
                        </h1>
                    </div>
                })}
            </Fragment>
        )
    }
}

