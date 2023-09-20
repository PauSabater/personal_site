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

        const pathEllipse: SVGPathElement | null = elEllipse.querySelector("path")
        const pathUnderline: SVGPathElement | null = elUnderline.querySelector("path")

        const tl = gsap.timeline().pause()
            .set(elTopBanner, {
                opacity: 0,
                y: 150
            })
            .set(elsLines[0], {opacity: 0, y: 100})
            .set(elsLines[1], {opacity: 0, y: 125})
            .set(elsLines[2], {opacity: 0, y: 150})
            .set(elDateBanner, {y: 400, opacity: 0})
            .set(elHeader, {
                opacity: 1,
                y: -100
            }, 0)
            .set(pathEllipse, {
                strokeDashoffset: 0,
                delay: 0.4
            })
            .set([pathUnderline], {
                strokeDashoffset: 0,
                delay: 0.6
            })
            .to(document.getElementById("page-overlay"), {
                opacity: 0,
                duration: 0.2
            }, 'start')
            .to(elTopBanner, {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: "power4.out",
                delay: 0
            }, 'end')
            .to(elsLines, {
                opacity: 1,
                y: 0,
                duration: 1.1,
                stagger: 0.05,
                delay: 0,
                ease: "power4.out"
            }, 'end')
            // Gradient element appear:
            .to(elGradient, {
                opacity: 1,
                duration: 1.5,
                delay: 0.3
            }, 'end')
            .to(elHeader, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power4.out",
                delay: 0.15
            }, 'end')
            // Date entering screen:
            .to(elDateBanner, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power4.out",
                onStartParams:[elDayNumber, 500],
                onStart: setDayNumCounter,
                delay: 0.15
            }, 'end')

            tl.play()

    })


    return () => ctx.revert()
}