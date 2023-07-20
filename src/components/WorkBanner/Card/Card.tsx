import styles from "./Card.module.scss"
import img from "../../../assets/img/clouds.png"
import {ReactComponent as MountainsSvg} from "../../../assets/svg/full-mountains.svg"
import { Fragment, useRef } from "react"
import { isElProportionHigherThanViewport } from "../../../assets/ts/utils/utils"
import { setCardTransitionAnimation } from "./Card.animations"

import ImgCloudFirstLine1 from "../../../assets/img/clouds/cloud-first-line-1.png"
import ImgCloudFirstLine2 from "../../../assets/img/clouds/cloud-first-line-2.png"
import SvgTreesFirstLayer from "../../../assets/svg/mountains/trees-first-layer.svg"



export interface ICardProps {
    title: string,
    text: string,
    img: string,
    path: string
}

export function Card({ props }: { props: ICardProps}) {
    const refImgContainer = useRef(null)


    const getImg = (img: string): JSX.Element => {
        if (img === 'mountains') {
            const images: string[] = ["cloud-first-line-1", "cloud-first-line-2"]
            return (
                <div className={styles.imgMountainContainer}>
                    {/* {
                    images.map((img)=>
                        <img id="cloud-first-line-1" src={require(`../../../assets/svg/mountains${img}`)}/>
                    )} */}
                    <img id="cloud-first-line-1" src={ImgCloudFirstLine1}/>
                    <img id="cloud-first-line-2" src={ImgCloudFirstLine2}/>
                    <img id="trees-first-layer" src={SvgTreesFirstLayer}/>
                </div>
                // <Fragment>
                //     <MountainsSvg />
                //     {/* <img className={`${styles.img} img`} src={img}></img> */}
                //     <div className={styles.rain} id="rain-container">
                //         {[...Array(500)].map((_, i) => <div className={styles.drop}></div>)}
                //     </div>
                // </Fragment>
            )
        } else return <img className={styles.img} src={require(`../../../assets/svg/${img}`)}></img>
    }

    const handleCardClick = ()=> {
        const elImgContainer: HTMLElement | null = refImgContainer.current
        if (elImgContainer === null) return
        setCardTransitionAnimation(elImgContainer, props.path)
    }


    return (
        <div onClick={handleCardClick} className={`${styles.container} card-container`} data-path={props.path}>
            <p className={styles.title}>{props.title}</p>
            <div className={`${styles.containerText}`}>
                <p className={`${styles.text} card-text`}>{props.text}</p>
                <a className={`${styles.link}`}>{"--> view case"}</a>
            </div>
            <div
                className={`${styles.imgContainer}  img-container`}
                ref={refImgContainer}>
                {getImg(props.img)}
            </div>
        </div>
    )
}