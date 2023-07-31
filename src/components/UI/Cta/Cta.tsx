import styles from "./Cta.module.scss"

export interface IBtnProps {
    text: string,
    href: string,
    color: string
}

export function Cta({ props }: { props: IBtnProps}) {

    return (
        <a href={props.href || ''} className={`${styles.cta} ${styles[props.color]}`} data-cta>
            {props.text}
        </a>
    )
}