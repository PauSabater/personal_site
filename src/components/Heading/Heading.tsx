import styles from "./Heading.module.scss"


export interface IHeadingProps {
    text: string,
    align: string
}

export function Heading({ props }: { props: IHeadingProps}) {

    return (
        <h1 className={`${styles.heading} ${styles[props.align]}`}>
            {props.text}
        </h1>
    )
}