import styles from "./Card.module.scss"
import { Fragment, useRef } from "react"
import { setCardTransitionAnimation } from "./Card.animations"
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

export interface ICardProps {
    title: string,
    text: string,
    img: string,
    path: string
}

export const getImg = (img: string, includeRain = true): JSX.Element => {
    if (img === 'mountains') {

        return (
            <Fragment>
                <div className={styles.imgMountainContainer} data-img-mountain="" data-transitioned-image="" id="card-3-img-wrap">
                    <img id="sky" src={SvgSky} alt="sky"/>
                    <SvgSkyDarkening/>
                    <img id="sky-darkening-img" className={styles.skyDarkening} src={SvgSkyDarkeningImg} alt="sly darkening layer"/>
                    <img id="lightning" className={styles.lightning} src={SvgLightning} alt="lightning"/>
                    <img id="mountains" src={SvgMountains} alt="mountains"/>
                    <img loading="lazy" id="cloud-third-line" className={`${`${styles.cloud} cloud`} cloud`} src={ImgCloudThirdLine} alt="clouds"/>
                    <img loading="lazy" id="cloud-third-line-copy" className={`${styles.cloud} ${styles.cloudFromLeft} cloud`} src={ImgCloudThirdLine} alt="clouds"/>
                    <img id="trees-third-layer" src={SvgTreesThirdLayer} alt="threes third layer"/>
                    <img id="trees-second-layer" src={SvgTreesSecondLayer} alt="threes second layer"/>
                    <img id="moon" src={SvgMoon} alt="moon"/>
                    <img id="cloud-second-line-copy" className={`${styles.cloud} ${styles.cloudFromRight} cloud`} src={ImgCloudSecondLine} alt="clouds second line copy"/>
                    <img loading="lazy" id="cloud-second-line" className={`${styles.cloud} cloud`} src={ImgCloudSecondLine} alt="clouds second line"/>
                    <img id="darkening-layer" className={styles.darkeningLayer} src={SvgDarkeningLayer} alt="darkening layer"/>
                    <img id="trees-first-layer" src={SvgTreesFirstLayer} alt="threes first layer"/>
                    <img loading="lazy" id="cloud-first-line-1"className={`${styles.cloud} cloud`} src={ImgCloudFirstLine1} alt="clouds first line"/>
                    <img loading="lazy" id="cloud-first-line-1-copy"className={`${styles.cloud} ${styles.cloudFromLeft} cloud`} src={ImgCloudFirstLine1} alt="cloud first line copy"/>
                </div>
                {
                    includeRain === true
                        ?   <Fragment>
                                <div className={styles.rain} id="rain-container">
                                    {[...Array(200)].map((_, i) => <div key={`drop-${i}`} className={styles.drop}></div>)}
                                </div>
                            </Fragment>
                        : ''
                }
            </Fragment>
        )

    } else if(img === "personal-site.svg") {return (
            <img className={styles.img} src={require(`../../../assets/svg/${img}`)} data-filter-invert="" data-transitioned-image="" alt={img}></img>
    )
    } else return <img className={styles.img} src={require(`../../../assets/svg/${img}`)} data-transitioned-image="" alt={img}></img>
}

export function getMountainImgs() {
    return (
        <Fragment>
            <img src={SvgSky} alt={"sky"} />
            <img src={SvgMountains} alt={"mountains"}/>
            <img src={SvgTreesThirdLayer} alt={"layer of trees"}/>
            <img src={SvgTreesSecondLayer} alt={"layer of trees"}/>
            <img src={SvgMoon} alt={"moon"}/>
            <img src={SvgTreesFirstLayer} alt={"trees first layer"}/>
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