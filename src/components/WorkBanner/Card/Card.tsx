import styles from "./Card.module.scss"
import img from "../../../assets/img/clouds.png"
import {ReactComponent as MountainsSvg} from "../../../assets/svg/full-mountains.svg"
import { Fragment } from "react"

export interface ICardProps {
    title: string,
    text: string
}

const getImg = (): JSX.Element => {
    return (
        <Fragment>
            <MountainsSvg />
            {/* <img className={`${styles.img} img`} src={img}></img> */}
            <div className={styles.rain} id="rain-container">
                {[...Array(500)].map((_, i) => <div className={styles.drop}></div>)}
            </div>
        </Fragment>
    )
}

export function Card({ props }: { props: ICardProps}) {


    return (
        <div className={styles.container}>
            <p className={styles.title}>{props.title}</p>
            <div className={`${styles.containerText}`}>
                <p className={`${styles.text} card-text`}>{props.text}</p>
                <a className={`${styles.link}`}>{"--> view case"}</a>
            </div>
            <div className={`${styles.imgContainer}  img-container`}>
                {getImg()}
            </div>
        </div>
    )
}