import gsap from "gsap"
import { isMobileScreen } from "../../assets/ts/utils/utils"

export function setTextAnimation(elContainerTexts: HTMLElement) {

    const elHeadingContainer: HTMLElement = (elContainerTexts as HTMLElement).querySelector("#work-banner-heading") as HTMLElement
    const elLinesTextContainer: HTMLElement = (elContainerTexts as HTMLElement).querySelector("#work-banner-texts") as HTMLElement
    const elLink: HTMLElement = (elContainerTexts as HTMLElement).querySelector("a") as HTMLElement
    const elsLinesText: NodeListOf<HTMLParagraphElement> = (elLinesTextContainer as HTMLElement).querySelectorAll("p")
    const elGradient = (elContainerTexts as HTMLElement).querySelector("#work-banner-gradient")

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
                gsap.fromTo(elHeadingContainer, {opacity: 0}, {opacity: 1, duration: 0.4})
                gsap.fromTo([elHeadingContainer.querySelectorAll("h1")],
                    {opacity: 0, y: 150}, {opacity: 1, y: 0, duration: 0.8})
                gsap.to(elGradient, {opacity: 0.6, duration: 0.8, delay: 0.5})
                gsap.fromTo(Array.from(elsLinesText), {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 1, stagger: 0.075, delay: 0.4})
                gsap.fromTo(elLink, {opacity: 0}, {opacity: 1, duration: 0.7, delay: 0.4})
                observer.unobserve(elLinesTextContainer)
                observer.unobserve(elHeadingContainer)
            }
        })
    }

}

export function getCloudsAnimation(container: HTMLElement, placeClouds = false) {

    const elFirstCloudsLayerOne = (container as HTMLElement).querySelector('#cloud-first-line-1') as HTMLElement
    const elFirstCloudsLayerOneCopy = (container as HTMLElement).querySelector('#cloud-first-line-1-copy') as HTMLElement
    const elSecondCloudsLayer = (container as HTMLElement).querySelector('#cloud-second-line') as HTMLElement
    const elSecondCloudsLayerCopy = (container as HTMLElement).querySelector('#cloud-second-line-copy') as HTMLElement
    const elThirdCloudsLayer = (container as HTMLElement).querySelector('#cloud-third-line') as HTMLElement
    const elThirdCloudsLayerCopy = (container as HTMLElement).querySelector('#cloud-third-line-copy') as HTMLElement

    const duration = isMobileScreen() ? 75 : 150

    return gsap.timeline({ repeat: -1 })
        // Clouds to the right
        .to([elFirstCloudsLayerOne, elThirdCloudsLayer], {xPercent: 50, duration: duration, ease: 'none'}, 0)
        .to([elFirstCloudsLayerOneCopy, elThirdCloudsLayerCopy,], {xPercent: -50, duration: duration, ease: 'none'}, 0)
        // Clouds to the left
        .to([elSecondCloudsLayer,], {xPercent: -150, duration: duration, ease: 'none'}, 0)
        .to([elSecondCloudsLayerCopy,], {xPercent: -50, duration: duration, ease: 'none'}, 0)
}