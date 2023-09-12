import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)


export function scrollToFromHomePage(elTarget: HTMLLinkElement) {
    const elOverlay = document.getElementById("page-overlay")

    const idElScrollTo = elTarget.getAttribute("data-scroll-to")
    if (!idElScrollTo) return

    let elScrollTo: HTMLElement
    let duration: number

    if (window.location.href.includes("projects")) {
        elScrollTo = document.getElementById(idElScrollTo) as HTMLElement
        duration = 0.5
    } else {
        elScrollTo = document.getElementById("foot-banner") as HTMLElement
        duration = 1.5
    }

    if (elScrollTo === null) return

    gsap.timeline()
        .pause()
        .to(elOverlay, {
            opacity: 1,
            duration: duration,
            onStart: () => {
                if (idElScrollTo === 'method-section') {
                    gsap.set(elScrollTo.firstElementChild, {
                        y: 150,
                        delay: duration
                    })
                    gsap.to(elScrollTo.firstElementChild, {
                        y: 0,
                        delay: duration + 0.15,
                        duration: duration
                    })
                }
            }
        })
        .to(window, {
            duration: 0,
            scrollTo: {
                y: elScrollTo,
                offsetY: 150
            }
        })
        .to(elOverlay, {
            opacity: 0,
            duration: duration
        })
        .play()
}

export function addOutlineHeader() {
    const elHeader = document.getElementById("header") as HTMLElement
    if (elHeader === null) return

    elHeader.setAttribute("data-is-outlined", "")
}

export function removeOutlineHeader() {
    const elHeader = document.getElementById("header") as HTMLElement
    if (elHeader === null) return

    elHeader.removeAttribute("data-is-outlined")
}

export function showHeader() {
    gsap.set(document.getElementById("header"), {opacity: 1})
}