import styles from "./WorkBanner.module.scss"
import { Card } from "./Card/Card"
import { Heading, IHeadingProps } from "../UI/Heading/Heading"
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { texts } from "../../assets/ts/texts/texts"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { setTextAnimation } from "./WorkBanner.animations"
import { Button, IBtnProps } from "../UI/Button/Button"
// import { getWorkBannerAnimations } from "./WorkBanner.animations"

gsap.registerPlugin(ScrollTrigger)


export interface IWorkBannerProps {
    heading: IHeadingProps,
    text: string[],
    button: IBtnProps
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
        const card3Svg: SVGSVGElement = (card3 as HTMLElement).querySelector('svg') as SVGSVGElement
        const card3Img: HTMLElement = (card3 as HTMLElement).querySelector('img') as HTMLElement
        const card3Rain: HTMLElement = (card3 as HTMLElement).querySelector('#rain-container') as HTMLElement
        // Card 3 illustration elements:
        const elMoon: HTMLElement = (card3 as HTMLElement).querySelector('#moon') as HTMLElement
        const elDarkeningLayer: HTMLElement = (card3 as HTMLElement).querySelector('#darkening-layer') as HTMLElement
        const elSkyDarkening: HTMLElement = (card3 as HTMLElement).querySelector('#sky-darkening') as HTMLElement
        const elLightning: HTMLElement = (card3 as HTMLElement).querySelector('#lightning') as HTMLElement
        // Clouds:
        const elFirstCloudsLayerOne = (card3 as HTMLElement).querySelector('#cloud-first-line-1') as HTMLElement
        const elFirstCloudsLayerOneCopy = (card3 as HTMLElement).querySelector('#cloud-first-line-1-copy') as HTMLElement
        const elFirstCloudsLayerTwo = (card3 as HTMLElement).querySelector('#cloud-first-line-2') as HTMLElement
        const elFirstCloudsLayerTwoCopy = (card3 as HTMLElement).querySelector('#cloud-first-line-2-copy') as HTMLElement
        const elSecondCloudsLayer = (card3 as HTMLElement).querySelector('#cloud-second-line') as HTMLElement
        const elSecondCloudsLayerCopy = (card3 as HTMLElement).querySelector('#cloud-second-line-copy') as HTMLElement
        const elThirdCloudsLayer = (card3 as HTMLElement).querySelector('#cloud-third-line') as HTMLElement
        const elThirdCloudsLayerCopy = (card3 as HTMLElement).querySelector('#cloud-third-line-copy') as HTMLElement

        // Set distances on images for animations:
        const distCard3ToTop = (elContainer as HTMLElement).getBoundingClientRect().top - card3Svg.getBoundingClientRect().top
        card3Svg.setAttribute("data-dist-top", Math.abs(distCard3ToTop).toString())

        const  distCard3ToLeft = (card3Svg.parentElement as HTMLElement).getBoundingClientRect().left
        card3Svg.setAttribute("data-dist-left", Math.abs(distCard3ToLeft).toString())


        let ctx = gsap.context(() => {

            setTextAnimation(elContainerTexts)

            // Texts animations

            // CARDS ANIMATIONS

            const tlLightning = gsap.timeline({ repeat: -1, repeatDelay: 7 })
            tlLightning.pause()

            tlLightning
                .to(elLightning, {duration: 0.15, yoyo: true, opacity: "0.15", repeat: 1})
                .to(elLightning, {duration: 0.1, yoyo: true, opacity: "0.2", repeat: 1})
                .to(elLightning, {duration: 0.1, yoyo: true, opacity: "0.15", repeat: 1, delay: 3})
                .to(elLightning, {duration: 0.2, yoyo: true, opacity: "0.1", repeat: 1})

            let timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: elContainer,
                    start: "top",
                    end: "bottom -250%",
                    pin: true,
                    pinSpacing: true,
                    markers: true,
                    scrub: 0.5,
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

            timeline.addLabel('initial')
                .set([card1, card2, card3], {yPercent: 150, opacity: 1})

            timeline.addLabel('startaaa')
                .to(card1, {yPercent: 0})

            timeline.addLabel('second')
                .to(card2, {yPercent: 0})

            timeline.addLabel('third')
                .to(card3, {yPercent: 0, onComplete: ()=> {
                    console.log("left is" + ScrollTrigger.positionInViewport(card3Svg, "left"))
                    // console.log(`window:   -=${window.innerHeight}`)
                    // console.log(`percentage:   -=${ScrollTrigger.positionInViewport(card3Svg, "top")}`)
                    // console.log(`heyyy:   -=${window.innerHeight * ScrollTrigger.positionInViewport(card3Svg, "top")}`)

                    console.log(window.innerWidth / window.innerHeight)
                    console.log(card3Svg.getBoundingClientRect().width / card3Svg.getBoundingClientRect().height)
                    // cardDistToTop = `-=${(elContainer as HTMLElement).getBoundingClientRect().top - card3Svg.getBoundingClientRect().top}`
                    }
                })
                .set(cardsContainer, {pointerEvents: "none"})


            // timeline.addLabel('move-cards')
            //     .to(card1, {x: 1000})
            //     .to(card2, {x: 500}, '-=0.2')
            //     .to(card3, {x: 200}, '-=0.4')


            // Animate third card:
            timeline.addLabel('forth')
                .set(card3ImgContainer, {borderRadius: '15'})
                .to(elContainerTexts, {
                    opacity: 0,
                    y: `-=80vh`
                }, 'end')
                .to(card3ImgContainer, { width: card3Svg.getBoundingClientRect().width }, 'end')
                //  maybe for mobile
                // .to(card3ImgContainer, {x: (card3Svg.getBoundingClientRect().width / 2) * -1}, 'end')
                // .to(card3ImgContainer, { width: card3Svg.getBoundingClientRect().width }, 'end')

            const myFunction = () => {
                gsap.set(elFirstCloudsLayerOneCopy, {transformOrigin:"50% 50%", scaleX: -1, xPercent: -100})
                gsap.set(elSecondCloudsLayerCopy, {transformOrigin:"50% 50%", scaleX: -1, xPercent: 100})
                gsap.set(elThirdCloudsLayerCopy, {transformOrigin:"50% 50%", scaleX: -1, xPercent: -100})
                gsap.to(elFirstCloudsLayerOneCopy, {duration: 90, ease: "none", xPercent: 0})
                gsap.to(elFirstCloudsLayerOne, {duration: 90, ease: "none", xPercent: 100})
                gsap.to(elSecondCloudsLayer, {repeat: -1, duration: 90, ease: "none", xPercent: -100})
                gsap.to(elSecondCloudsLayerCopy, {repeat: -1, duration: 90, ease: "none", xPercent: 0})
                gsap.to(elThirdCloudsLayer, {duration: 120, ease: "none", xPercent: 100})
                gsap.to(elThirdCloudsLayerCopy, {duration: 120, ease: "none", xPercent: 0})
            }


            // Animate third img:
            timeline.addLabel('fifth')
                //.set(cardsContainer, {overflow: 'visible'})
                .set(card3ImgContainer, {overflow: 'visible'})
                .to(card3Svg, {
                    x: (): string => {
                        return `-=${card3Svg.getAttribute("data-dist-left")}`
                    },
                    y: (): string => {
                        return `-=${window.innerHeight * ScrollTrigger.positionInViewport(card3Svg, "top")}`
                    },
                    height: (): string => {
                        console.log(`percentage: ${((window.innerWidth / window.innerHeight) / (card3Svg.getBoundingClientRect().width / card3Svg.getBoundingClientRect().height))}`)
                        console.log(`RETUUUURN: ${((card3Svg.getBoundingClientRect().width / card3Svg.getBoundingClientRect().height) / (window.innerWidth / window.innerHeight)) * 100}vh`)
                        return `${((card3Svg.getBoundingClientRect().width / card3Svg.getBoundingClientRect().height) / (window.innerWidth / window.innerHeight)) * 100}vh`}
                }, 'start')
                .to(card3Img, {
                    width: (): string => {
                        //return `-=${((window.innerWidth / window.innerHeight) / (card3Svg.getBoundingClientRect().width / card3Svg.getBoundingClientRect().height)) * 100}vw`
                        return `-=${card3Svg.getAttribute("data-dist-left")}`
                    },
                }, 'start')
                .to(card3Rain, {
                    x: (): string => {return `-=${card3Svg.getAttribute("data-dist-left")}`},
                    y: (): string => {
                        return `-=${Math.abs((elContainer as HTMLElement).getBoundingClientRect().top - card3Svg.getBoundingClientRect().top)}`
                    },
                    width: "105vw"
                }, 'start')
                .to(card3Rain, {
                    width: "105vw"
                }, 'start')
                .to(elMoon, {opacity: "0"}, 'start')
                //.to(elDarkeningLayer, {fillOpacity: "0.4", onComplete: ()=> {tlLightning.play()}}, 'start')
                .to(elSkyDarkening, {fillOpacity: "0.7", onStart: myFunction}, 'start')
                .to(elFirstCloudsLayerOneCopy, {opacity: "0.1"}, 'start')
                .to(elSecondCloudsLayerCopy, {opacity: "0.55"}, 'start')
                .to(elThirdCloudsLayerCopy, {opacity: "0.3"}, 'start')
                .to(elFirstCloudsLayerOne, {opacity: "0.10"}, 'start')
                .to(elFirstCloudsLayerTwo, {opacity: "0.03"}, 'start')
                .to(elSecondCloudsLayer, {opacity: "0.55"}, 'start')
                .to(elThirdCloudsLayer, {opacity: "0.3"}, 'start')

            // TEXTS ANIMATIONS


        })
        return () => ctx.revert()

    }, [])


    return (
        <Fragment>
            <div ref={refFullContainer} className={styles.sectionContainer}>
                <div ref={refContainer} className={styles.container} id="cards-container">
                    <div className={styles.cardsContainer} id="test">
                        <div className={styles.cardContainer} id="card-1">
                            <Card props={{
                                title: "WORK IN PAPERNEST",
                                text: "// Work developed for papernest during my frontend contract",
                                img: "papernest.svg",
                                path: "project"
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
                                path: "/"
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
                                <Button btnProps={texts.workBanner.button} />
                            </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}