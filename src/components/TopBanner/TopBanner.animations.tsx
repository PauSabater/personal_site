import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"
import { getTodayDayNum, isVerticalMobileTablet } from "../../assets/ts/utils/utils"
import { easeOutLong } from "../../assets/ts/styles/styles"
gsap.registerPlugin(ScrollTrigger, CustomEase)

export function setTopBannerAnimations(refContainerTitleDesktop: React.MutableRefObject<null>, refContainerTitleMobile: React.MutableRefObject<null>) {
    let ctx = gsap.context(() => {

        // Reference element from component:
        let elContainerTitle: HTMLElement | null = isVerticalMobileTablet() ? refContainerTitleMobile.current : refContainerTitleDesktop.current
        //elContainerTitle = refContainerTitleDesktop.current

        // Query elements from DOM:
        const elHeader: HTMLElement = document.querySelector("#header") as HTMLElement
        const elDateBanner: HTMLElement = document.querySelector("#date-banner") as HTMLElement
        const elDayNumber: HTMLElement = document.querySelector("#day-num") as HTMLElement

        if (elContainerTitle === null) return
        const elsTitles: NodeListOf<HTMLParagraphElement> = (elContainerTitle as HTMLElement).querySelectorAll("p")

        // Set timeline
        let tlTopBanner = gsap.timeline()
        tlTopBanner.set(Array.from(elsTitles), {rotationY:"95deg", opacity: 0})
        tlTopBanner.set(elHeader, {y: -200, opacity: 1})
        tlTopBanner.set(elDateBanner, {y: 400, opacity: 1})

        // Animate titles rotation:
        tlTopBanner.to(Array.from(elsTitles), {
            rotationY:"0deg",
            ease: CustomEase.create("custom", easeOutLong),
            duration: 1.2,
            opacity: 1,
            stagger: 0.4
        }, 'start')

        // Animate titles opacity separately from rotation:
        tlTopBanner.to(Array.from(elsTitles), {
            opacity: 1,
            duration: 1.2,
            stagger: 0.4
        }, 'start')

        // Header entering screen:
        tlTopBanner.to(elHeader, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: CustomEase.create("custom", easeOutLong)
        }, 0.7)

        // Date entering screen:
        tlTopBanner.to(elDateBanner, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: CustomEase.create("custom", easeOutLong),
            onStartParams:[elDayNumber, 500],
            onStart: setDayNumCounter,
            onCompleteParams:[isVerticalMobileTablet() ? refContainerTitleDesktop.current : refContainerTitleMobile.current],
            onComplete: setElAttribute
        }, 0.7)

        tlTopBanner.delay(0.7)
    })

    return () => ctx.revert()
}

function setElAttribute(elParentTitles: HTMLElement) {
    if (elParentTitles === null) return
    elParentTitles.setAttribute('data-animation-completed', '')
}

function setDayNumCounter(elDayNumber: HTMLElement, delayExec: number) {
    if (elDayNumber === null) return
    const numToday: number = parseInt(getTodayDayNum())
    let numCount: number = 0
    const delay = (1000 - delayExec) / numToday

    setTimeout(()=> {
        const interval: NodeJS.Timer = setInterval(()=> {
            numCount += 1
            const numString = numCount < 10 ? `0${numCount.toString()}` : numCount.toString()
            elDayNumber.textContent = numString
            if (numCount === numToday) clearInterval(interval)
        }
        , delay)
    }, delayExec)
}