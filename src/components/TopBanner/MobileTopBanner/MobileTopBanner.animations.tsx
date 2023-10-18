import gsap from "gsap"
import { setDayNumCounter } from "../TopBanner.animations"

export function setMobileTopBannerAnimations(el: HTMLElement | null) {

    let ctx = gsap.context(() => {
        const elTopBanner = document.getElementById("top-banner")
        const elsLines = document.querySelectorAll(".line")

        const elHeader: HTMLElement = document.querySelector("#header") as HTMLElement
        const elDateBanner: HTMLElement = document.querySelector("#date-banner") as HTMLElement
        const elDayNumber: HTMLElement = document.querySelector("#day-num") as HTMLElement
        const elGradient: HTMLElement = document.querySelector("#top-banner-gradient") as HTMLElement
        const elEllipse: HTMLElement = document.querySelector("#top-banner-ellipse svg") as HTMLElement
        const elUnderline: HTMLElement = document.querySelector("#top-banner-underline svg") as HTMLElement
        const spanAnimated: HTMLElement = document.querySelector(".span-animated") as HTMLElement

        const pathEllipse: SVGPathElement | null = elEllipse.querySelector("path")
        const pathUnderline: SVGPathElement | null = elUnderline.querySelector("path")
        const baseDelay = 0.5

        const tl = gsap.timeline().pause()
            .set(elTopBanner, {
                opacity: 0,
                y: 150
            })
            .set(elsLines[0], {opacity: 0, yPercent: 70})
            .set(elsLines[1], {opacity: 0, yPercent: 100})
            .set(elsLines[2], {opacity: 0, yPercent: 125})
            .set(elDateBanner, {y: 400, opacity: 0})
            .set(elHeader, {
                opacity: 1,
                y: -100
            }, 0)
            .set(pathEllipse, {
                strokeDashoffset: 0,
                delay: 0.3,
            }, 'end')
            .set([pathUnderline], {
                strokeDashoffset: 0,
                delay: 0.4
            })
            .to(elTopBanner, {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: "power4.out",
                delay: baseDelay,
                onStart: ()=> {
                    setTimeout(()=> spanAnimated.setAttribute("data-animated", ""), 300)
                }
            }, 'end')
            .to(elsLines, {
                opacity: 1,
                yPercent: 0,
                duration: 1.1,
                stagger: 0.05,
                delay: baseDelay,
                ease: "power4.out"
            }, 'end')
            // Gradient element appear:
            .to(elGradient, {
                opacity: 0.9,
                duration: 1.5,
                delay: baseDelay + 0.3
            }, 'end')
            .to(elHeader, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power4.out",
                delay: baseDelay + 0.15
            }, 'end')
            // Date entering screen:
            .to(elDateBanner, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power4.out",
                onStartParams:[elDayNumber, 500],
                onStart: setDayNumCounter,
                delay: baseDelay + 0.15
            }, 'end')

            tl.play()
    })


    return () => ctx.revert()
}