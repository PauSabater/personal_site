import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"
import { getTodayDayNum, isVerticalMobileTablet } from "../../assets/ts/utils/utils"
import { easeOutLong } from "../../assets/ts/styles/styles"
gsap.registerPlugin(ScrollTrigger, CustomEase)

export function setTopBannerAnimations(el: HTMLElement | null) {
    console.log("IN SET TOP BANNER ANIM")

    let ctx = gsap.context(() => {


        // Query elements from DOM:
        const elHeader: HTMLElement = document.querySelector("#header") as HTMLElement
        const elDateBanner: HTMLElement = document.querySelector("#date-banner") as HTMLElement
        const elDayNumber: HTMLElement = document.querySelector("#day-num") as HTMLElement
        const elGradient: HTMLElement = document.querySelector("#top-banner-gradient") as HTMLElement
        const elEllipse: HTMLElement = document.querySelector("#top-banner-ellipse svg") as HTMLElement
        const elUnderline: HTMLElement = document.querySelector("#top-banner-underline svg") as HTMLElement


        const pathEllipse: SVGPathElement | null = elEllipse.querySelector("path")
        const pathUnderline: SVGPathElement | null = elUnderline.querySelector("path")

        if (pathEllipse === null) return
        const lenghtPath = pathEllipse.getTotalLength()
        console.log("PATH IS "+lenghtPath)

        // gsap.set(pathEllipse, {
        //     strokeDashoffset: lenghtPath,
        //     strokeDasharray: lenghtPath
        // })

        // Set timeline
        let tlTopBanner = gsap.timeline().pause()
        tlTopBanner
            .set(elHeader, {y: -200, opacity: 1})
            .set(elDateBanner, {y: 400, opacity: 1})
            // Header entering screen:
            .set([pathEllipse], {
                strokeDashoffset: 0,
                delay: 0
            })
            .set([pathUnderline], {
                strokeDashoffset: 0,
                delay: 0.8
            })
            .to(elHeader, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: CustomEase.create("custom", easeOutLong)
            }, 0)
            // Gradient element appear:
            .to(elGradient, {
                opacity: 1,
                duration: 1.5,
                delay: 0
            }, 0)
            // Date entering screen:
            .to(elDateBanner, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: CustomEase.create("custom", easeOutLong),
                onStartParams:[elDayNumber, 500],
                onStart: setDayNumCounter,
            }, 0)
            .play()
    })

    return () => ctx.revert()
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