import styles from "./WorkBanner.module.scss"
import { Card } from "./Card/Card"
import { Heading, IHeadingProps } from "../UI/Heading/Heading"
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { texts } from "../../assets/ts/texts/texts"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { getCloudsAnimation, setTextAnimation } from "./WorkBanner.animations"
import { Cta, ICtaProps } from "../UI/Cta/Cta"
import { isViewportPropHigherThanEl, isMobileScreen, getViewportAspectRatio, getScaleToCoverViewPort, getGsapDistToCenterElXAxis, getGsapDistToCenterElYAxis } from "../../assets/ts/utils/utils"
import { Link } from "react-router-dom"
import { addOutlineHeader, removeOutlineHeader } from "../Header/Header.animations"
// import { getWorkBannerAnimations } from "./WorkBanner.animations"

gsap.registerPlugin(ScrollTrigger)


export interface IWorkBannerProps {
    heading: IHeadingProps,
    text: string[],
    Cta: ICtaProps
}

export function WorkBanner({props}: { props: IWorkBannerProps }) {

    const refContainer = useRef(null)
    const refFullContainer = useRef(null)
    const refContainerTexts = useRef(null)

    useLayoutEffect(() => {
        const elContainer: HTMLElement | null = refFullContainer.current
        const elContainerTexts: HTMLElement | null = refContainerTexts.current
        if (elContainer === null || elContainerTexts === null) return

        const cardsContainer: HTMLElement = (elContainer as HTMLElement).querySelector('#cards-container') as HTMLElement
        const card1: HTMLElement = (elContainer as HTMLElement).querySelector('#card-1') as HTMLElement
        const card2: HTMLElement = (elContainer as HTMLElement).querySelector('#card-2') as HTMLElement
        const card3: HTMLElement = (elContainer as HTMLElement).querySelector('#card-3') as HTMLElement

        // Card 3 elements:
        const card3ImgContainer: HTMLElement = (card3 as HTMLElement).querySelector('.img-container') as HTMLElement
        const card3Svg: SVGSVGElement = (card3 as HTMLElement).querySelector('#sky-darkening') as SVGSVGElement
        const card3Rain: HTMLElement = (card3 as HTMLElement).querySelector('#rain-container') as HTMLElement
        // // Card 3 illustration elements:
        // const elWireframe: HTMLElement = (card3 as HTMLElement).querySelector('#mountains-wireframe') as HTMLElement
        const elMoon: HTMLElement = (card3 as HTMLElement).querySelector('#moon') as HTMLElement
        const elDarkeningLayer: HTMLElement = (card3 as HTMLElement).querySelector('#darkening-layer') as HTMLElement
        const elSkyDarkeningImg: HTMLElement = (card3 as HTMLElement).querySelector('#sky-darkening-img') as HTMLElement
        const elLightning: HTMLElement = (card3 as HTMLElement).querySelector('#lightning') as HTMLElement
        // // Clouds:
        const elsClouds = (card3 as HTMLElement).querySelectorAll('.cloud') as NodeListOf<Element>
        const elFirstCloudsLayerOneCopy = (card3 as HTMLElement).querySelector('#cloud-first-line-1-copy') as HTMLElement
        const elSecondCloudsLayerCopy = (card3 as HTMLElement).querySelector('#cloud-second-line-copy') as HTMLElement
        const elThirdCloudsLayerCopy = (card3 as HTMLElement).querySelector('#cloud-third-line-copy') as HTMLElement

        let ctx = gsap.context(() => {

            setTextAnimation(elContainerTexts)

            const tlLightning = gsap.timeline({ repeat: -1, repeatDelay: 7 })
            tlLightning.pause()

            tlLightning
                .to(elLightning, {duration: 0.15, yoyo: true, opacity: "0.3", repeat: 1})
                .to(elLightning, {duration: 0.1, yoyo: true, opacity: "0.4", repeat: 1})
                .to(elLightning, {duration: 0.1, yoyo: true, opacity: "0.3", repeat: 1, delay: 3})
                .to(elLightning, {duration: 0.2, yoyo: true, opacity: "0.4", repeat: 1})

            const tlClouds = getCloudsAnimation(card3)
            tlClouds.pause()

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
                    invalidateOnRefresh: true,
                    onEnter: () => {
                        addOutlineHeader()
                        tlClouds.pause()
                        tlLightning.pause()
                        gsap.to(card3Rain, {display: "block", opacity: "0"})
                    },
                    onLeave: () => {
                        tlClouds.play()
                        tlLightning.play()
                        gsap.to(card3Rain, {display: "block", opacity: "0.3"})
                    },
                    onEnterBack: () => {
                        removeOutlineHeader()
                        tlLightning.pause()
                        tlClouds.pause()
                        gsap.to(card3Rain, {display: "none", opacity: "0"})

                    },
                }
            })

            timeline.addLabel('cards-placement')
                .set([elFirstCloudsLayerOneCopy, elThirdCloudsLayerCopy], {xPercent: -150, scaleX: -1})
                .set([elSecondCloudsLayerCopy], {xPercent: 50, scaleX: -1})
                .set(card1, {yPercent: 30, opacity: 1})
                .set([card2, card3], {yPercent: 150, opacity: 0})
                .set([
                    card1.querySelector(".overlay"),
                    card2.querySelector(".overlay")
                ], {opacity: "0"})

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
                // .to(elWireframe, {
                //     opacity: 0
                // }, 'end')
                .to(elContainerTexts, {
                    opacity: 0,
                    y: `-=100vh`
                }, 'end')
                .to(card3ImgContainer, {
                    width: ()=> {
                        console.log('aspect ratio: '+ getViewportAspectRatio())
                    // Wider viewport
                    if(isViewportPropHigherThanEl(card3Svg)) {
                        return card3Svg.getBoundingClientRect().width
                    // Higher viewport
                    } else {
                        const dist = card3Svg.getBoundingClientRect().height * getViewportAspectRatio()
                        return dist > card3ImgContainer.getBoundingClientRect().width ? dist : card3ImgContainer.getBoundingClientRect().width
                    }
                }}, 'end')

            // Animate third img:
            timeline.addLabel('fifth')
                .set(card3ImgContainer, {borderRadius: 0})
                .to(card3ImgContainer, {
                    x: (): string => getGsapDistToCenterElXAxis(card3ImgContainer),
                    y: (): string => getGsapDistToCenterElYAxis(card3ImgContainer),
                    scale: ()=> getScaleToCoverViewPort(card3Svg)
                }, 'start')

                .to(elMoon, {opacity: "0"}, 'start')
                .to(elDarkeningLayer, {
                    opacity: "0.3",
                }, 'start')
                .to(elSkyDarkeningImg, {opacity: "0.6", /* onStart: myFunction},*/}, 'start')
                .to(elsClouds, {opacity: "0.7"}, 'start')
        })
        return () => ctx.revert()

    }, [])


    return (
        <Fragment>
            <div ref={refFullContainer} className={styles.sectionContainer}>
                {/* <div className={styles.halfHelper}></div> */}
                <div ref={refContainer} className={styles.container}>
                    <div className={styles.cardsContainer} id="cards-container">
                        <div className={styles.cardContainer} id="card-1">
                            <Card props={{
                                title: "WORK IN PAPERNEST",
                                text: "// Work developed for papernest during my frontend contract",
                                img: "papernest.svg",
                                path: "projects/papernest"
                                // path: '/'
                            }}></Card>
                        </div>
                        <div className={styles.cardContainer} id="card-2">
                            <Card props={{
                                title: "PERSONAL WEBSITE",
                                text: "// A site to present myself and my work",
                                img: "personal-site.svg",
                                path: "/"
                            }}></Card>
                        </div>
                        <div className={styles.cardContainer} id="card-3">
                            <Card props={{
                                title: "WEATHER NPM PACKAGE",
                                text: "// A react weather component installable through npm",
                                img: "mountains",
                                path: "projects/weather-app"
                                // path: '/'
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
                                <Link to="/projects">hello</Link>
                            </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}