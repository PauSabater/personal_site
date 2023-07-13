import styles from "./WorkBanner.module.scss"
import { Card } from "./Card/Card"
import { Heading, IHeadingProps } from "../Heading/Heading"
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { texts } from "../../assets/ts/texts/texts"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)


export interface IWorkBannerProps {
    heading: IHeadingProps,
    text: string
}

export function WorkBanner({props}: { props: IWorkBannerProps }) {

    const container = useRef(null)
    const containerFull = useRef(null)
    const sectionAfter = useRef(null)

    const [distCard3, setDistCard3] = useState<number>(0)


    useLayoutEffect(() => {
        const containerEl: HTMLElement | null = containerFull.current
        const sectionAfterEl: HTMLElement | null = sectionAfter.current
        if (containerEl === null || sectionAfterEl === null) return

        const cardsContainer: HTMLElement = (containerEl as HTMLElement).querySelector('#cards-container') as HTMLElement
        const card1: HTMLElement = (containerEl as HTMLElement).querySelector('#card-1') as HTMLElement
        const card2: HTMLElement = (containerEl as HTMLElement).querySelector('#card-2') as HTMLElement
        const card3: HTMLElement = (containerEl as HTMLElement).querySelector('#card-3') as HTMLElement

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
        const distCard3ToTop = (containerEl as HTMLElement).getBoundingClientRect().top - card3Svg.getBoundingClientRect().top
        card3Svg.setAttribute("data-dist-top", Math.abs(distCard3ToTop).toString())

        const  distCard3ToLeft = (card3Svg.parentElement as HTMLElement).getBoundingClientRect().left
        card3Svg.setAttribute("data-dist-left", Math.abs(distCard3ToLeft).toString())



        let ctx = gsap.context(() => {

            const tlLightning = gsap.timeline({ repeat: -1, repeatDelay: 7 })
            tlLightning.pause()

            tlLightning
                .to(elLightning, {duration: 0.15, yoyo: true, opacity: "0.15", repeat: 1})
                .to(elLightning, {duration: 0.1, yoyo: true, opacity: "0.2", repeat: 1})
                .to(elLightning, {duration: 0.1, yoyo: true, opacity: "0.15", repeat: 1, delay: 3})
                .to(elLightning, {duration: 0.2, yoyo: true, opacity: "0.1", repeat: 1})

            let timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerEl,
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
                .set(card1, {yPercent: 150, opacity: 1})
                .set(card2, {yPercent: 150, opacity: 1})
                .set(card3, {yPercent: 150, opacity: 1})

            timeline.addLabel('startaaa')
                .to(card1, {yPercent: 0})

            timeline.addLabel('second')
                .to(card2, {yPercent: 0})

            timeline.addLabel('third')
                .to(card3, {yPercent: 0, onComplete: ()=> {
                    console.log(`heyyy:   -=${(containerEl as HTMLElement).getBoundingClientRect().top - card3Svg.getBoundingClientRect().top}`)
                    // cardDistToTop = `-=${(containerEl as HTMLElement).getBoundingClientRect().top - card3Svg.getBoundingClientRect().top}`
                    }
                })
                .set(cardsContainer, {pointerEvents: "none"})
                // .set(card2.querySelector('.card-text'), {opacity: 0})

            // Animate third card:
            timeline.addLabel('forth')
                //.set(containerEl, {overflow: 'visible'})
                .set(card3ImgContainer, {borderRadius: '15'})
                .to(card3ImgContainer, { width: 700 })

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
                    x: (): string => {return `-=${card3Svg.getAttribute("data-dist-left")}`},
                    y: (): string => {
                        console.log('SVG POSIITON IS  '+ScrollTrigger.positionInViewport(card3Svg, "top"))
                        return `-=${card3Svg.getAttribute("data-dist-top")}`
                    },
                    height: (window.innerHeight * 1.05).toString()
                }, 'start')
                .to(card3Img, {
                    width: "105vw"
                }, 'start')
                .to(card3Rain, {
                    x: (): string => {return `-=${card3Svg.getAttribute("data-dist-left")}`},
                    y: (): string => {
                        return `-=${Math.abs((containerEl as HTMLElement).getBoundingClientRect().top - card3Svg.getBoundingClientRect().top)}`
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

        })
        return () => ctx.revert();

    }, [])


    return (
        <Fragment>
            <div ref={containerFull} className={styles.sectionContainer}>
                <div ref={container} className={styles.container} id="cards-container">
                    <div className={styles.cardsContainer} id="test">
                        <div className={styles.cardContainer}  id="card-1">
                            <Card props={{title: "WEATHER NPM PACKAGE", text: "// A react weather component installable through npm"}}></Card>
                        </div>
                        <div className={styles.cardContainer} id="card-2">
                            <Card props={{title: "WEATHER NPM PACKAGE", text: "// A react weather component installable through npm"}}></Card>
                        </div>
                        <div className={styles.cardContainer} id="card-3">
                            <Card props={{
                                title: "WEATHER NPM PACKAGE",
                                text: "// A react weather component installable through npm",
                            }}></Card>
                        </div>
                    </div>
                    <div className={styles.textContainer} id="work-container-texts">
                        <Heading props={ texts.workBanner.heading }></Heading>
                        <p>{texts.workBanner.text}</p>
                    </div>
                </div>
            </div>
            <div ref={sectionAfter} className={styles.extra} id="section-after">
                <div>
                HELLO MORE STUFF
                </div>
            </div>
        </Fragment>
    )
}