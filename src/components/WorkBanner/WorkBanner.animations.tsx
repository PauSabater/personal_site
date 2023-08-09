import gsap from "gsap"

export function setTextAnimation(elContainerTexts: HTMLElement) {

    const elHeadingContainer: HTMLElement = (elContainerTexts as HTMLElement).querySelector("#work-banner-heading") as HTMLElement
    const elLinesTextContainer: HTMLElement = (elContainerTexts as HTMLElement).querySelector("#work-banner-texts") as HTMLElement
    const elsHeadings: NodeListOf<HTMLHeadingElement> = (elHeadingContainer as HTMLElement).querySelectorAll("h1")
    const elsLinesText: NodeListOf<HTMLParagraphElement> = (elLinesTextContainer as HTMLElement).querySelectorAll("p")

    const optObserver = {
        root: null,
        rootMargin: "0px 0px 0% 0px",
        threshold: 0.6
    }

    const observer: IntersectionObserver = new IntersectionObserver((entries)=> observerCallback(entries), optObserver)
    observer.observe(elHeadingContainer)
    observer.observe(elLinesTextContainer)

    const observerCallback = (entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting && entry.target.className === elHeadingContainer.className) {
                gsap.fromTo(elHeadingContainer, {opacity: 0}, {opacity: 1, duration: 0.6})
                gsap.fromTo(Array.from(elsHeadings), {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 0.5, stagger: 0.1})
                observer.unobserve(elHeadingContainer)
            }

            if (entry.isIntersecting && entry.target.className === elLinesTextContainer.className) {
                gsap.fromTo(Array.from(elsLinesText), {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 0.5, stagger: 0.1})
                observer.unobserve(elLinesTextContainer)
            }
        })
    }

}

export function getCloudsAnimation(container: HTMLElement) {

    const elFirstCloudsLayerOne = (container as HTMLElement).querySelector('#cloud-first-line-1') as HTMLElement
    const elFirstCloudsLayerOneCopy = (container as HTMLElement).querySelector('#cloud-first-line-1-copy') as HTMLElement
    const elSecondCloudsLayer = (container as HTMLElement).querySelector('#cloud-second-line') as HTMLElement
    const elSecondCloudsLayerCopy = (container as HTMLElement).querySelector('#cloud-second-line-copy') as HTMLElement
    const elThirdCloudsLayer = (container as HTMLElement).querySelector('#cloud-third-line') as HTMLElement
    const elThirdCloudsLayerCopy = (container as HTMLElement).querySelector('#cloud-third-line-copy') as HTMLElement

    return gsap.timeline({ repeat: -1 })
        .set([elFirstCloudsLayerOneCopy, elThirdCloudsLayerCopy], {xPercent: -150, scaleX: -1})
        .set([elSecondCloudsLayerCopy], {xPercent: 49.98, scaleX: -1})
        // Clouds to the right
        .to([elFirstCloudsLayerOne, elThirdCloudsLayer], {xPercent: 50, duration: 150, ease: 'none'}, 0)
        .to([elFirstCloudsLayerOneCopy, elThirdCloudsLayerCopy,], {xPercent: -50, duration: 150, ease: 'none'}, 0)
        // Clouds to the left
        .to([elSecondCloudsLayer,], {xPercent: -150, duration: 150, ease: 'none'}, 0)
        .to([elSecondCloudsLayerCopy,], {xPercent: -50, duration: 150, ease: 'none'}, 0)
}



















// import gsap from "gsap"
// import ScrollTrigger from "gsap/ScrollTrigger"
// import { CustomEase } from "gsap/CustomEase";
// import { isMobileScreen } from "../../assets/ts/utils/utils";

// gsap.registerPlugin(ScrollTrigger, CustomEase)

// export function getWorkBannerAnimations(refFullContainer: React.MutableRefObject<null>, sectionAfter: React.MutableRefObject<null>) {
//     const elContainer: HTMLElement | null = refFullContainer.current
//     const elSectionAfter: HTMLElement | null = sectionAfter.current
//     if (elContainer === null || elSectionAfter === null) return


//     const cardsContainer: HTMLElement = (elContainer as HTMLElement).querySelector('#cards-container') as HTMLElement
//     const card1: HTMLElement = (elContainer as HTMLElement).querySelector('#card-1') as HTMLElement
//     const card2: HTMLElement = (elContainer as HTMLElement).querySelector('#card-2') as HTMLElement
//     const container: HTMLElement = (elContainer as HTMLElement).querySelector('#card-3') as HTMLElement

//     // Card 3 elements:
//     const containerImgContainer: HTMLElement = (container as HTMLElement).querySelector('.img-container') as HTMLElement
//     const containerSvg: SVGSVGElement = (container as HTMLElement).querySelector('svg') as SVGSVGElement
//     const containerImg: HTMLElement = (container as HTMLElement).querySelector('img') as HTMLElement
//     const containerRain: HTMLElement = (container as HTMLElement).querySelector('#rain-container') as HTMLElement
//     // Card 3 illustration elements:
//     const elMoon: HTMLElement = (container as HTMLElement).querySelector('#moon') as HTMLElement
//     const elDarkeningLayer: HTMLElement = (container as HTMLElement).querySelector('#darkening-layer') as HTMLElement
//     const elSkyDarkening: HTMLElement = (container as HTMLElement).querySelector('#sky-darkening') as HTMLElement
//     const elLightning: HTMLElement = (container as HTMLElement).querySelector('#lightning') as HTMLElement
//     // Clouds:
//     const elFirstCloudsLayerOne = (container as HTMLElement).querySelector('#cloud-first-line-1') as HTMLElement
//     const elFirstCloudsLayerOneCopy = (container as HTMLElement).querySelector('#cloud-first-line-1-copy') as HTMLElement
//     const elFirstCloudsLayerTwo = (container as HTMLElement).querySelector('#cloud-first-line-2') as HTMLElement
//     const elFirstCloudsLayerTwoCopy = (container as HTMLElement).querySelector('#cloud-first-line-2-copy') as HTMLElement
//     const elSecondCloudsLayer = (container as HTMLElement).querySelector('#cloud-second-line') as HTMLElement
//     const elSecondCloudsLayerCopy = (container as HTMLElement).querySelector('#cloud-second-line-copy') as HTMLElement
//     const elThirdCloudsLayer = (container as HTMLElement).querySelector('#cloud-third-line') as HTMLElement
//     const elThirdCloudsLayerCopy = (container as HTMLElement).querySelector('#cloud-third-line-copy') as HTMLElement

//     // Set distances on images for animations:
//     const distcontainerToTop = (elContainer as HTMLElement).getBoundingClientRect().top - containerSvg.getBoundingClientRect().top
//     containerSvg.setAttribute("data-dist-top", Math.abs(distcontainerToTop).toString())

//     const  distcontainerToLeft = (containerSvg.parentElement as HTMLElement).getBoundingClientRect().left
//     containerSvg.setAttribute("data-dist-left", Math.abs(distcontainerToLeft).toString())



//     let ctx = gsap.context(() => {

//         const tlLightning = gsap.timeline({ repeat: -1, repeatDelay: 7 })
//         tlLightning.pause()

//         tlLightning
//             .to(elLightning, {duration: 0.15, yoyo: true, opacity: "0.15", repeat: 1})
//             .to(elLightning, {duration: 0.1, yoyo: true, opacity: "0.2", repeat: 1})
//             .to(elLightning, {duration: 0.1, yoyo: true, opacity: "0.15", repeat: 1, delay: 3})
//             .to(elLightning, {duration: 0.2, yoyo: true, opacity: "0.1", repeat: 1})

//         let timeline = gsap.timeline({
//             scrollTrigger: {
//                 trigger: elContainer,
//                 start: "top",
//                 end: "bottom -250%",
//                 pin: true,
//                 pinSpacing: true,
//                 markers: true,
//                 scrub: 0.5,
//                 onLeave: () => {
//                     tlLightning.play()
//                     gsap.to(containerRain, {display: "block", opacity: "0.3"})
//                 },
//                 onEnterBack: () => {
//                     tlLightning.pause()
//                     gsap.to(containerRain, {display: "none", opacity: "0"})
//                 },
//             }
//         })

//         timeline.addLabel('initial')
//             .set(card1, {yPercent: 150, opacity: 1})
//             .set(card2, {yPercent: 150, opacity: 1})
//             .set(container, {yPercent: 150, opacity: 1})

//         timeline.addLabel('startaaa')
//             .to(card1, {yPercent: 0})

//         timeline.addLabel('second')
//             .to(card2, {yPercent: 0})

//         timeline.addLabel('third')
//             .to(container, {yPercent: 0, onComplete: ()=> {
//                 console.log(`heyyy:   -=${(elContainer as HTMLElement).getBoundingClientRect().top - containerSvg.getBoundingClientRect().top}`)
//                 // cardDistToTop = `-=${(elContainer as HTMLElement).getBoundingClientRect().top - containerSvg.getBoundingClientRect().top}`
//                 }
//             })
//             .set(cardsContainer, {pointerEvents: "none"})
//             // .set(card2.querySelector('.card-text'), {opacity: 0})

//         // Animate third card:
//         timeline.addLabel('forth')
//             //.set(elContainer, {overflow: 'visible'})
//             .set(containerImgContainer, {borderRadius: '15'})
//             .to(containerImgContainer, { width: 700 })

//         const myFunction = () => {
//             gsap.set(elFirstCloudsLayerOneCopy, {transformOrigin:"50% 50%", scaleX: -1, xPercent: -100})
//             gsap.set(elSecondCloudsLayerCopy, {transformOrigin:"50% 50%", scaleX: -1, xPercent: 100})
//             gsap.set(elThirdCloudsLayerCopy, {transformOrigin:"50% 50%", scaleX: -1, xPercent: -100})
//             gsap.to(elFirstCloudsLayerOneCopy, {duration: 90, ease: "none", xPercent: 0})
//             gsap.to(elFirstCloudsLayerOne, {duration: 90, ease: "none", xPercent: 100})
//             gsap.to(elSecondCloudsLayer, {repeat: -1, duration: 90, ease: "none", xPercent: -100})
//             gsap.to(elSecondCloudsLayerCopy, {repeat: -1, duration: 90, ease: "none", xPercent: 0})
//             gsap.to(elThirdCloudsLayer, {duration: 120, ease: "none", xPercent: 100})
//             gsap.to(elThirdCloudsLayerCopy, {duration: 120, ease: "none", xPercent: 0})
//         }


//         // Animate third img:
//         timeline.addLabel('fifth')
//             //.set(cardsContainer, {overflow: 'visible'})
//             .set(containerImgContainer, {overflow: 'visible'})
//             .to(containerSvg, {
//                 x: (): string => {return `-=${containerSvg.getAttribute("data-dist-left")}`},
//                 y: (): string => {
//                     console.log('SVG POSIITON IS  '+ScrollTrigger.positionInViewport(containerSvg, "top"))
//                     return `-=${containerSvg.getAttribute("data-dist-top")}`
//                 },
//                 height: (window.innerHeight * 1.05).toString()
//             }, 'start')
//             .to(containerImg, {
//                 width: "105vw"
//             }, 'start')
//             .to(containerRain, {
//                 x: (): string => {return `-=${containerSvg.getAttribute("data-dist-left")}`},
//                 y: (): string => {
//                     return `-=${Math.abs((elContainer as HTMLElement).getBoundingClientRect().top - containerSvg.getBoundingClientRect().top)}`
//                 },
//                 width: "105vw"
//             }, 'start')
//             .to(containerRain, {
//                 width: "105vw"
//             }, 'start')
//             .to(elMoon, {opacity: "0"}, 'start')
//             //.to(elDarkeningLayer, {fillOpacity: "0.4", onComplete: ()=> {tlLightning.play()}}, 'start')
//             .to(elSkyDarkening, {fillOpacity: "0.7", onStart: myFunction}, 'start')
//             .to(elFirstCloudsLayerOneCopy, {opacity: "0.1"}, 'start')
//             .to(elSecondCloudsLayerCopy, {opacity: "0.55"}, 'start')
//             .to(elThirdCloudsLayerCopy, {opacity: "0.3"}, 'start')
//             .to(elFirstCloudsLayerOne, {opacity: "0.10"}, 'start')
//             .to(elFirstCloudsLayerTwo, {opacity: "0.03"}, 'start')
//             .to(elSecondCloudsLayer, {opacity: "0.55"}, 'start')
//             .to(elThirdCloudsLayer, {opacity: "0.3"}, 'start')

//     })
//     return () => ctx.revert()
// }