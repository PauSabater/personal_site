import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase";
import { isMobileScreen } from "../../assets/ts/utils/utils";
gsap.registerPlugin(ScrollTrigger, CustomEase)

export function setTopBannerAnimations(refContainerTitleDesktop: React.MutableRefObject<null>, refContainerTitleMobile: React.MutableRefObject<null>) {
    let ctx = gsap.context(() => {

        // Reference element from component:
        let elContainerTitle: HTMLElement | null = isMobileScreen() ? refContainerTitleDesktop.current : refContainerTitleMobile.current
        elContainerTitle = refContainerTitleDesktop.current

        // Query elements from DOM:
        const elHeader: HTMLElement = document.querySelector("#header") as HTMLElement
        const elDateBanner: HTMLElement = document.querySelector("#date-banner") as HTMLElement

        if (elContainerTitle === null) return

        const elsTitles: NodeListOf<HTMLParagraphElement> = (elContainerTitle as HTMLElement).querySelectorAll("p")
        const easeTitle: string = "M0,0,C0.11,0.494,0.212,0.618,0.32,0.748,0.439,0.891,0.504,1,1,1"

        // Set timeline
        let tlTopBanner = gsap.timeline()
        tlTopBanner.set(Array.from(elsTitles), {rotationY:"95deg", opacity: 0})
        tlTopBanner.set(elHeader, {y: -200, opacity: 1})
        tlTopBanner.set(elDateBanner, {y: 400, opacity: 1})

        // Animate titles rotation:
        tlTopBanner.to(Array.from(elsTitles), {
            rotationY:"0deg",
            ease: CustomEase.create("custom", easeTitle),
            duration: 0.4,
            opacity: 1,
            stagger: 0.3
        }, 'start')

        // Animate titles opacity separately from rotation:
        tlTopBanner.to(Array.from(elsTitles), {
            opacity: 1,
            duration: 0.3,
            stagger: 0.3
        }, 'start')

        // Header entering screen:
        tlTopBanner.to(elHeader, {
            opacity: 1,
            y: 0,
            duration: 0.3,
        }, 0.6)

        // Date entering screen:
        tlTopBanner.to(elDateBanner, {
            opacity: 1,
            y: 0,
            duration: 0.3,
        }, 0.6)

        tlTopBanner.delay(0.7)
    })

    return () => ctx.revert();
}

