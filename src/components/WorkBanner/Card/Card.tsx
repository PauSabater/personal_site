import styles from "./Card.module.scss"
import { Link } from "react-router-dom"


import img from "../../../assets/img/clouds.png"
import {ReactComponent as MountainsSvg} from "../../../assets/svg/full-mountains.svg"
import { Fragment, useRef } from "react"
import { isViewportPropHigherThanEl } from "../../../assets/ts/utils/utils"
import { setCardTransitionAnimation } from "./Card.animations"

import ImgCloudFirstLine1 from "../../../assets/img/clouds/cloud-first-line-1.png"
import ImgCloudFirstLine2 from "../../../assets/img/clouds/cloud-first-line-2.png"
import ImgCloudSecondLine from "../../../assets/img/clouds/cloud-second-line.png"
import ImgCloudThirdLine from "../../../assets/img/clouds/cloud-third-line.png"

import SvgWireframe from "../../../assets/svg/mountains/wireframe-full-mountains.svg"
import SvgTreesFirstLayer from "../../../assets/svg/mountains/trees-first-layer.svg"
import SvgDarkeningLayer from "../../../assets/svg/mountains/darkening-layer.svg"
import SvgMoon from "../../../assets/svg/mountains/moon.svg"
import SvgTreesSecondLayer from "../../../assets/svg/mountains/trees-second-layer.svg"
import SvgTreesThirdLayer from "../../../assets/svg/mountains/trees-third-layer.svg"
import SvgMountains from "../../../assets/svg/mountains/mountains.svg"
import SvgLightning from "../../../assets/svg/mountains/lightning.svg"
import {ReactComponent as SvgSkyDarkening} from "../../../assets/svg/mountains/sky-darkening.svg"
import SvgSky from "../../../assets/svg/mountains/sky.svg"
import SvgSkyDarkeningImg from "../../../assets/svg/mountains/sky-darkening.svg"


export interface ICardProps {
    title: string,
    text: string,
    img: string,
    path: string
}

export const getImg = (img: string, includeRain = true): JSX.Element => {
    if (img === 'mountains') {
        const images: string[] = ["cloud-first-line-1", "cloud-first-line-2"]
        return (
            <Fragment>
                <div className={styles.imgMountainContainer} data-img-mountain="" data-transitioned-image="" id="card-3-img-wrap">
                    <img id="sky" src={SvgSky}/>
                    <SvgSkyDarkening/>
                    <img id="sky-darkening-img" className={styles.skyDarkening} src={SvgSkyDarkeningImg}/>
                    <img id="lightning" className={styles.lightning} src={SvgLightning}/>
                    <img id="mountains" src={SvgMountains}/>
                    <img id="cloud-third-line" className={`${`${styles.cloud} cloud`} cloud`} src={ImgCloudThirdLine}/>
                    <img id="cloud-third-line-copy" className={`${styles.cloud} ${styles.cloudFromLeft} cloud`} src={ImgCloudThirdLine}/>
                    <img id="trees-third-layer" src={SvgTreesThirdLayer}/>
                    <img id="trees-second-layer" src={SvgTreesSecondLayer}/>
                    <img id="moon" src={SvgMoon}/>
                    <img id="cloud-second-line-copy" className={`${styles.cloud} ${styles.cloudFromRight} cloud`} src={ImgCloudSecondLine}/>
                    <img id="cloud-second-line" className={`${styles.cloud} cloud`} src={ImgCloudSecondLine}/>
                    <img id="darkening-layer" className={styles.darkeningLayer} src={SvgDarkeningLayer}/>
                    <img id="trees-first-layer" src={SvgTreesFirstLayer}/>
                    <img id="cloud-first-line-1"className={`${styles.cloud} cloud`} src={ImgCloudFirstLine1}/>
                    <img id="cloud-first-line-1-copy"className={`${styles.cloud} ${styles.cloudFromLeft} cloud`} src={ImgCloudFirstLine1}/>
                </div>
                {/* <div className={styles.halfHelper2}></div> */}
                {
                    includeRain === true
                        ?   <div className={styles.rain} id="rain-container">
                                {[...Array(400)].map((_, i) => <div className={styles.drop}></div>)}
                             </div>
                        : ''
                }
            </Fragment>
        )
    } else return <img className={styles.img} src={require(`../../../assets/svg/${img}`)} data-transitioned-image=""></img>
}

export function getMountainImgs() {
    return (
        <Fragment>
            <img src={SvgSky}/>
            <img src={SvgMountains}/>
            <img src={SvgTreesThirdLayer}/>
            <img src={SvgTreesSecondLayer}/>
            <img src={SvgMoon}/>
            <img src={SvgTreesFirstLayer}/>
        </Fragment>
    )
}

export function Card({ props }: { props: ICardProps}) {
    const refImgContainer = useRef(null)
    const handleCardClick = ()=> {
        console.log("HANDLE CLICK IMAGE!!")
        const elImgContainer: HTMLElement | null = refImgContainer.current
        if (elImgContainer === null) return
        setCardTransitionAnimation(elImgContainer, props.path)
}


    return (
        <Link onClick={handleCardClick} to={props.path} className={`${styles.container} card-container`} data-card-container="" data-path={props.path}>
            <p className={styles.title}>{props.title}</p>
            <div className={`${styles.containerText}`}>
                <p className={`${styles.text} card-text`}>{props.text}</p>
                <a className={`${styles.link}`} data-card-link>{"--> view case"}</a>
            </div>
            <div
                className={`${styles.imgContainer}  img-container`}
                ref={refImgContainer}>
                {getImg(props.img)}
            </div>
            <div className={`${styles.overlay} overlay`}></div>
        </Link>
    )
}