import styles from "./Card.module.scss"
import { Fragment, useRef } from "react"
import { setCardTransitionAnimation } from "./Card.animations"

import parse from 'html-react-parser'
import ImgCloudFirstLine1 from "../../../assets/img/clouds/cloud-first-line-1.png"
import ImgCloudSecondLine from "../../../assets/img/clouds/cloud-second-line.png"
import ImgCloudThirdLine from "../../../assets/img/clouds/cloud-third-line.png"
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
import { personalSiteSvgContent } from "../../../assets/svg/ts/varied"

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
                    <img loading="lazy" id="cloud-third-line" className={`${`${styles.cloud} cloud`} cloud`} src={ImgCloudThirdLine}/>
                    <img loading="lazy" id="cloud-third-line-copy" className={`${styles.cloud} ${styles.cloudFromLeft} cloud`} src={ImgCloudThirdLine}/>
                    <img id="trees-third-layer" src={SvgTreesThirdLayer}/>
                    <img id="trees-second-layer" src={SvgTreesSecondLayer}/>
                    <img id="moon" src={SvgMoon}/>
                    <img id="cloud-second-line-copy" className={`${styles.cloud} ${styles.cloudFromRight} cloud`} src={ImgCloudSecondLine}/>
                    <img loading="lazy" id="cloud-second-line" className={`${styles.cloud} cloud`} src={ImgCloudSecondLine}/>
                    <img id="darkening-layer" className={styles.darkeningLayer} src={SvgDarkeningLayer}/>
                    <img id="trees-first-layer" src={SvgTreesFirstLayer}/>
                    <img loading="lazy" id="cloud-first-line-1"className={`${styles.cloud} cloud`} src={ImgCloudFirstLine1}/>
                    <img loading="lazy" id="cloud-first-line-1-copy"className={`${styles.cloud} ${styles.cloudFromLeft} cloud`} src={ImgCloudFirstLine1}/>
                </div>
                {
                    includeRain === true
                        ?   <Fragment>
                                <div className={styles.rain} id="rain-container">
                                    {[...Array(200)].map((_, i) => <div key={`drop-${i}`} className={styles.drop}></div>)}
                                </div>
                                <div className={`${styles.rain} ${styles.rainReverse}`} id="rain-container">
                                    {[...Array(200)].map((_, i) => <div key={`drop-${i}`} className={styles.drop}></div>)}
                                 </div>
                            </Fragment>
                        : ''
                }
            </Fragment>
        )
    // } else if(img === "personal-site.svg") {return (
    //     <svg width="2560" height="1600" viewBox="0 0 2560 1600" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         {parse(personalSiteSvgContent())}
    //     </svg>
    // )
    } else if(img === "personal-site.svg") {return (
            <img className={styles.img} src={require(`../../../assets/svg/${img}`)} data-filter-invert="" data-transitioned-image=""></img>
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

export function Card({ props, mode = "light" }: { props: ICardProps, mode?: string}) {
    const refImgContainer = useRef(null)
    const handleCardClick = ()=> {
        const elImgContainer: HTMLElement | null = refImgContainer.current
        if (elImgContainer === null) return
        setCardTransitionAnimation(elImgContainer, props.path)
}


    return (
        <div onClick={handleCardClick} className={`${styles.container} card-container`} data-mode={mode} data-card-container="" data-path={props.path}>
            <p className={styles.title}>{props.title}</p>
            <div className={`${styles.containerText}`}>
                <p className={`${styles.text} card-text`}>{props.text}</p>
            </div>
            <div
                className={`${styles.imgContainer}  img-container`}
                ref={refImgContainer}>
                {getImg(props.img)}
            </div>
            <div className={`${styles.overlay} overlay`}></div>
        </div>
    )
}