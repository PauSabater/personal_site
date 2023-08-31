import { Link } from "react-router-dom"
import styles from "./Cta.module.scss"

export interface ICtaProps {
    text: string,
    href: string,
    color?: string,
    target?: string,
    isBold?: boolean,
    isLink?: boolean
}

export function Cta({ props }: { props: ICtaProps}) {

    return props.isLink !== false ?
        <Link
            to={props.href || ''}
            className={`${styles.cta} ${styles[props.color || "black"]} ${styles[props.isBold === false ? "regular" : "bold"]}`}
            data-cta
            target={props.target || "_blank"}
        >{props.text}
        </Link>
    :    <div
            className={`${styles.cta} ${styles[props.color || "black"]} ${styles[props.isBold === false ? "regular" : "bold"]}`}
            data-cta
        >{props.text}
        </div>
}