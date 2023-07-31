import styles from "./WorkBanner.module.scss"
import { Card } from "./Card/Card"
import { Heading, IHeadingProps } from "../UI/Heading/Heading"
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { texts } from "../../assets/ts/texts/texts"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { setTextAnimation } from "./WorkBanner.animations"
import { Cta, IBtnProps } from "../UI/Cta/Cta"
import { getProportionRelToViewport, isViewportPropHigherThanEl, isMobileScreen, getElementProportion, getViewportProportion } from "../../assets/ts/utils/utils"
// import { getWorkBannerAnimations } from "./WorkBanner.animations"

gsap.registerPlugin(ScrollTrigger)


export interface IWorkBannerProps {
    heading: IHeadingProps,
    text: string[],
    Cta: IBtnProps
}

export function WorkBanner({props}: { props: IWorkBannerProps }) {

    const refContainer = useRef(null)
    const refFullContainer = useRef(null)
    const refContainerTexts = useRef(null)

    useLayoutEffect(() => {

        //getWorkBannerAnimations(refFullContainer, refSectionAfter)

        const elContainer: HTMLElement | null = refFullContainer.current
        const elContainerTexts: HTMLElement | null = refContainerTexts.current
        if (elContainer === null || elContainerTexts === null) return

        const cardsContainer: HTMLElement = (elContainer as HTMLElement).querySelector('#cards-container') as HTMLElement
        const card1: HTMLElement = (elContainer as HTMLElement).querySelector('#card-1') as HTMLElement
        const card2: HTMLElement = (elContainer as HTMLElement).querySelector('#card-2') as HTMLElement
        const card3: HTMLElement = (elContainer as HTMLElement).querySelector('#card-3') as HTMLElement

        // Card 3 elements:
        const card3ImgContainer: HTMLElement = (card3 as HTMLElement).querySelector('.img-container') as HTMLElement
        const card3ImgWrap: HTMLElement = (card3 as HTMLElement).querySelector('#card-3-img-wrap') as HTMLElement
        const card3Svg: SVGSVGElement = (card3 as HTMLElement).querySelector('#sky-darkening') as SVGSVGElement

        // card-3-img-wrap

        // const card3Img: HTMLElement = (card3 as HTMLElement).querySelector('img') as HTMLElement
        const card3Rain: HTMLElement = (card3 as HTMLElement).querySelector('#rain-container') as HTMLElement
        // // Card 3 illustration elements:
        const elMoon: HTMLElement = (card3 as HTMLElement).querySelector('#moon') as HTMLElement
        const elDarkeningLayer: HTMLElement = (card3 as HTMLElement).querySelector('#darkening-layer') as HTMLElement
        const elSkyDarkeningImg: HTMLElement = (card3 as HTMLElement).querySelector('#sky-darkening-img') as HTMLElement
        const elLightning: HTMLElement = (card3 as HTMLElement).querySelector('#lightning') as HTMLElement
        // // Clouds:
        const elFirstCloudsLayerOne = (card3 as HTMLElement).querySelector('#cloud-first-line-1') as HTMLElement
        // const elFirstCloudsLayerOneCopy = (card3 as HTMLElement).querySelector('#cloud-first-line-1-copy') as HTMLElement
        // const elFirstCloudsLayerTwo = (card3 as HTMLElement).querySelector('#cloud-first-line-2') as HTMLElement
        // const elFirstCloudsLayerTwoCopy = (card3 as HTMLElement).querySelector('#cloud-first-line-2-copy') as HTMLElement
        const elSecondCloudsLayer = (card3 as HTMLElement).querySelector('#cloud-second-line') as HTMLElement
        // const elSecondCloudsLayerCopy = (card3 as HTMLElement).querySelector('#cloud-second-line-copy') as HTMLElement
        const elThirdCloudsLayer = (card3 as HTMLElement).querySelector('#cloud-third-line') as HTMLElement
        // const elThirdCloudsLayerCopy = (card3 as HTMLElement).querySelector('#cloud-third-line-copy') as HTMLElement

        // // Set distances on images for animations:
        // const distCard3ToTop = (elContainer as HTMLElement).getBoundingClientRect().top - card3Svg.getBoundingClientRect().top
        // card3Svg.setAttribute("data-dist-top", Math.abs(distCard3ToTop).toString())

        const  distCard3ToLeft = (card3Svg.parentElement?.parentElement as HTMLElement).getBoundingClientRect().left
        card3Svg.setAttribute("data-dist-left", Math.abs(distCard3ToLeft).toString())


        let ctx = gsap.context(() => {

            setTextAnimation(elContainerTexts)

            // Texts animations

            // CARDS ANIMATIONS

            const tlLightning = gsap.timeline({ repeat: -1, repeatDelay: 7 })
            tlLightning.pause()

            tlLightning
                .to(elLightning, {duration: 0.15, yoyo: true, opacity: "0.3", repeat: 1})
                .to(elLightning, {duration: 0.1, yoyo: true, opacity: "0.4", repeat: 1})
                .to(elLightning, {duration: 0.1, yoyo: true, opacity: "0.3", repeat: 1, delay: 3})
                .to(elLightning, {duration: 0.2, yoyo: true, opacity: "0.4", repeat: 1})

            let timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: isMobileScreen() ? cardsContainer : elContainer,
                   // trigger: elContainer,
                    start: "top",
                    end: "bottom",
                    pin: true,
                    pinSpacing: true,
                    markers: true,
                    scrub: 1,
                    onLeave: () => {
                        tlLightning.play()
                        gsap.to(card3Rain, {display: "block", opacity: "0.3"})
                    },
                    onEnterBack: () => {
                        tlLightning.pause()
                        gsap.to(card3Rain, {display: "none", opacity: "0"})
                    },
                }
            })

            timeline.addLabel('cards-placement')
                .set(card1, {yPercent: 30, opacity: 1})
                .set([card2, card3], {yPercent: 150, opacity: 0})
                .set([
                    card1.querySelector(".overlay"),
                    card2.querySelector(".overlay")
                ], {opacity: "0"})


            //timeline.addLabel('place-card-1-and-2')


            // timeline.addLabel('place-card-2')
            //     .set(card2, {opacity: 1})
            //     .to(card2, {yPercent: 0})
            //     .set(card1.querySelector(".overlay"), {opacity: 0.5})
            //     .set(card1.querySelector(".img-container"), {opacity: 0})

            timeline.addLabel('place-card-3')
                .set(card2, {opacity: 1})
                .to([card1, card2], {yPercent: 0})
                .set(card1.querySelector(".img-container"), {opacity: 0})
                .set(card1.querySelector(".overlay"), {opacity: 0.5})
                .set(card3, {opacity: 1})
                .to(card3, {yPercent: 0})
                .set(card2.querySelector(".overlay"), {opacity: 0.5})
                .set(card2.querySelector(".img-container"), {opacity: 0})
                .set(card1.querySelector(".overlay"), {opacity: 0.7})
                .set(cardsContainer, {pointerEvents: "none"})


            // Animate third card:
            timeline.addLabel('forth')
                .set(card3ImgContainer, {
                    borderRadius: '15'
                })
                .to(elContainerTexts, {
                    opacity: 0,
                    y: `-=100vh`
                }, 'end')
                .to(card3ImgContainer, {
                    width: card3Svg.getBoundingClientRect().width
                }, 'end')

            // Animate third img:
            timeline.addLabel('fifth')
                //.set(cardsContainer, {overflow: 'visible'})
                .set(card3ImgContainer, {overflow: 'visible'})
                .to(card3ImgWrap, {
                    //x: 600,
                    x: (): string => {
                        // proportion image width to window width
                        const dist = (window.innerWidth / 2) - parseInt(card3Svg.getAttribute("data-dist-left") as string)
                        // const propImgToWindow = card3Svg.getBoundingClientRect().width / window.innerWidth
                        // return `${dist}`
                        console.log("heyyy")
                        console.log(isViewportPropHigherThanEl(card3Svg))
                        console.log("prop image is")
                        console.log(getElementProportion(card3Svg))

                        console.log("viewport prop is")
                        console.log(getViewportProportion())

                        console.log("WIDTH SVG IS: "+card3Svg.getBoundingClientRect().width)
                        console.log("TO CENTERRRR:")
                        const imgCenterToLeft = (parseInt(card3Svg.getAttribute("data-dist-left") || '0') + (card3Svg.getBoundingClientRect().width / 2))
                        const windowHalf = window.innerWidth / 2
                        const distance = windowHalf - imgCenterToLeft
                        console.log(windowHalf - imgCenterToLeft)
                        return distance > 0
                            ? distance.toString()
                            : `-=${distance}`



                        // return '0'

                        // return isViewportPropHigherThanEl(card3Svg)
                        //     ? `${card3Svg.getAttribute("data-dist-left")?.toString()}`
                        //     : `-=${card3Svg.getAttribute("data-dist-left")?.toString()}`
                        //return `-=${card3Svg.getAttribute("data-dist-left")?.toString()}` || '0'
                    },
                    y: (): string => {
                        const windowHalfHeight = window.innerHeight / 2
                        const elHalfHeight = card3Svg.getBoundingClientRect().height
                        const dist = windowHalfHeight - elHalfHeight

                        console.log("HEYYY TO TOP: "+dist)

                        return `-=${Math.abs(dist).toString()}`
                        //return `-=${window.innerHeight * ScrollTrigger.positionInViewport(card3Svg, "top")}`
                        //return '0'
                    },
                    width: isViewportPropHigherThanEl(card3Svg)
                        ? '100vw'
                        : ((getViewportProportion() / getElementProportion(card3Svg)) * window.innerWidth).toString()
                    ,
                    height: isViewportPropHigherThanEl(card3Svg)
                        ? ((getViewportProportion() / getElementProportion(card3Svg)) * window.innerHeight).toString()
                        : '100vh'
                    }, 'start')

                .to(elMoon, {opacity: "0"}, 'start')
                .to(elDarkeningLayer, {opacity: "0.3", onComplete: ()=> {tlLightning.play()}}, 'start')
                .to(elSkyDarkeningImg, {opacity: "0.6", /* onStart: myFunction},*/}, 'start')
                .to(elFirstCloudsLayerOne, {opacity: "1"}, 'start')
                .to(elSecondCloudsLayer, {opacity: "1"}, 'start')
                .to(elThirdCloudsLayer, {opacity: "1"}, 'start')

            //     .to(elFirstCloudsLayerOneCopy, {opacity: "0.1"}, 'start')
            //     .to(elSecondCloudsLayerCopy, {opacity: "0.55"}, 'start')
            //     .to(elThirdCloudsLayerCopy, {opacity: "0.3"}, 'start')
            //     .to(elFirstCloudsLayerTwo, {opacity: "0.03"}, 'start')
            //     .to(elSecondCloudsLayer, {opacity: "0.55"}, 'start')
            //     .to(elThirdCloudsLayer, {opacity: "0.3"}, 'start')

            // TEXTS ANIMATIONS


        })
        return () => ctx.revert()

    }, [])


    return (
        <Fragment>
            <div ref={refFullContainer} className={styles.sectionContainer}>
                <div ref={refContainer} className={styles.container}>
                    <div className={styles.cardsContainer} id="cards-container">
                        <div className={styles.cardContainer} id="card-1">
                            <Card props={{
                                title: "WORK IN PAPERNEST",
                                text: "// Work developed for papernest during my frontend contract",
                                img: "papernest.svg",
                                path: "projects/papernest"
                            }}></Card>
                        </div>
                        <div className={styles.cardContainer} id="card-2">
                            <Card props={{
                                title: "PERSONAL WEBSITE",
                                text: "// A site to present myself and my work",
                                img: "papernest.svg",
                                path: "/"
                            }}></Card>
                        </div>
                        <div className={styles.cardContainer} id="card-3">
                            <Card props={{
                                title: "WEATHER NPM PACKAGE",
                                text: "// A react weather component installable through npm",
                                img: "mountains",
                                path: "projects/weather-app"
                            }}></Card>
                        </div>
                    </div>
                    <div className={styles.textContainer} ref={refContainerTexts}>
                        <div className={styles.headingContainer} id="work-banner-heading">
                            <p className={styles.preTitle}>// WORK</p>
                            <Heading props={ texts.workBanner.heading }></Heading>
                        </div>
                        <div id="work-banner-texts" className={styles.textLinesContainer} >
                            {texts.workBanner.text.map((line) => {
                                return (
                                    <div className={styles.lineWrap}>
                                        <p>{line}</p>
                                    </div>
                                )
                            })}
                                <Cta props={texts.workBanner.Cta} />
                            </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}