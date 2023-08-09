import styles from "./Cta.module.scss"

export interface ICtaProps {
    text: string,
    href: string,
    color?: string,
    target?: string,
    isBold?: boolean
}

export function Cta({ props }: { props: ICtaProps}) {

    return (
        <a
            href={props.href || ''}
            className={`${styles.cta} ${styles[props.color || "black"]} ${styles[props.isBold === false ? "regular" : "bold"]}`}
            data-cta
            target={props.target || "_blank"}
        >{props.text}
        </a>
    )
}