import styles from "./WorkBanner.module.scss"
import { Card } from "./Card/Card"
import { Heading, IHeadingProps } from "../UI/Heading/Heading"
import { Fragment, useLayoutEffect, useRef } from "react"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { getCloudsAnimation, setTextAnimation } from "./WorkBanner.animations"
import { Cta, ICtaProps } from "../UI/Cta/Cta"
// @ts-ignore -- TODO: solve declaration file from package
import { isViewportPropHigherThanEl, isMobileScreen, getViewportAspectRatio, getScaleToCoverViewPort, getGsapDistToCenterElXAxis, getGsapDistToCenterElYAxis, matchMediaMobile } from "@pausabater/utils/dist/index.esm.js"
import { addOutlineHeader, removeOutlineHeader } from "../Header/Header.animations"

gsap.registerPlugin(ScrollTrigger)

export interface IWorkBannerProps {
    heading: IHeadingProps,
    text: string[],
    Cta: ICtaProps
}

export function WorkBanner({props, mode}: { props: IWorkBannerProps, mode: string }) {

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
        // Card 3 illustration elements:
        const elMoon: HTMLElement = (card3 as HTMLElement).querySelector('#moon') as HTMLElement
        const elDarkeningLayer: HTMLElement = (card3 as HTMLElement).querySelector('#darkening-layer') as HTMLElement
        const elSkyDarkeningImg: HTMLElement = (card3 as HTMLElement).querySelector('#sky-darkening-img') as HTMLElement
        const elLightning: HTMLElement = (card3 as HTMLElement).querySelector('#lightning') as HTMLElement
        // Clouds:
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
                    start: "top",
                    end: `bottom -=${window.innerHeight * 2}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: isMobileScreen() ? 0 : 1,
                    invalidateOnRefresh: false,
                    anticipatePin: 1,
                    fastScrollEnd: 3000,
                    onEnter: () => {
                        addOutlineHeader()
                        tlClouds.pause()
                        tlLightning.pause()
                        if(!isMobileScreen()) {
                            gsap.to(card3Rain, {display: "block", opacity: "0"})
                        }
                    },
                    onLeave: () => {
                        tlClouds.play()
                        tlLightning.play()
                        if(!isMobileScreen()) {
                            gsap.to(card3Rain, {display: "block", opacity: "0.45"})
                        }
                    },
                    onEnterBack: () => {
                        removeOutlineHeader()
                        tlLightning.pause()
                        tlClouds.pause()
                        if(!isMobileScreen()) {
                            gsap.to(card3Rain, {display: "none", opacity: "0"})
                        }
                    },
                }
            })

            // Initial setup
            timeline
                .set([elFirstCloudsLayerOneCopy, elThirdCloudsLayerCopy], {xPercent: -150, scaleX: -1})
                .set([elSecondCloudsLayerCopy], {xPercent: 50, scaleX: -1})
                .set(card1, {yPercent: isMobileScreen() ? 20 : 30, opacity: 1})
                .set([card2, card3], {yPercent: 150, opacity: 0})
                .set([
                    card1.querySelector(".overlay"),
                    card2.querySelector(".overlay")
                ], {opacity: "0"})

            // Cards move to reveal
            timeline
                .to(card2, {opacity: 1, duration: 0})
                .to([card1, card2], {yPercent: 0, opacity: 1, duration: 1.1})
                .set(card1.querySelector(".overlay"), {opacity: 0.5})
                .set(card3, {opacity: 1})
                .to(card3, {yPercent: 0, duration: 1.1})
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
                    border: 'none',
                    width: ()=> {
                        // Wider viewport
                        if(isViewportPropHigherThanEl(card3Svg)) {
                            return card3Svg.getBoundingClientRect().width
                        // Higher viewport
                        } else {
                            const dist = card3Svg.getBoundingClientRect().height * getViewportAspectRatio()
                            return dist > card3ImgContainer.getBoundingClientRect().width ? dist : card3ImgContainer.getBoundingClientRect().width
                        }},
                    duration: 0,
                    ...!isMobileScreen() && {duration: 1.5}
                }, 'end')

            // Animate third img:
            timeline.addLabel('fifth')
                .set(card3ImgContainer, {borderRadius: 0})
                .to(card3ImgContainer, {
                    ...!isMobileScreen() && {
                        x: (): string => getGsapDistToCenterElXAxis(card3ImgContainer),
                        y: (): string => getGsapDistToCenterElYAxis(card3ImgContainer),
                    },
                    ...isMobileScreen() && {
                        y: -50,
                    },
                    scale: ()=> isMobileScreen() ? getScaleToCoverViewPort(card3Svg) + 0.35 : getScaleToCoverViewPort(card3Svg),
                    duration: isMobileScreen() ? 4 : 3.5
                }, 'start')

                .to(elMoon, {
                    opacity: "0",
                    duration: 1,
                }, 'start')
                .to(elDarkeningLayer, {
                    opacity: "0.3",
                    duration: 2,
                }, 'start')
                .to(elSkyDarkeningImg, {
                    opacity: "0.6",
                    duration: 2,
                }, 'start')
                .to(elsClouds, {
                    opacity: "0.7",
                    duration: 2,
                }, 'start')


                const mql = window.matchMedia(matchMediaMobile)
                mql.onchange = () => timeline.scrollTrigger?.refresh()
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
                                title: "WORK AT PAPERNEST",
                                text: "// Work developed for papernest during my frontend contract",
                                img: "papernest.svg",
                                path: "projects/papernest"
                            }}></Card>
                        </div>
                        <div className={styles.cardContainer} id="card-2">
                            <Card props={{
                                title: "PERSONAL WEBSITE",
                                text: "// A site to present myself and my work",
                                img: "personal-site.svg",
                                path: "/"
                            }}
                                mode={mode}
                        ></Card>
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
                            <Heading props={ props.heading }></Heading>
                        </div>
                        <div id="work-banner-texts" className={styles.textLinesContainer} >
                            {props.text.map((line, i) => {
                                return (
                                    <div className={styles.lineWrap} key={`text-${i}`}>
                                        <p>{line}</p>
                                    </div>
                                )
                            })}
                                <Cta props={props.Cta} />
                            </div>
                        <div className={`${styles.gradient}`} data-mode={mode} id="work-banner-gradient"></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}