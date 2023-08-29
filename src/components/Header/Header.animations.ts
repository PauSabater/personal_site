import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)



export function scrollToFromHomePage(elTarget: HTMLLinkElement) {
    const elOverlay = document.getElementById("page-overlay")

            const idElScrollTo = elTarget.getAttribute("data-scroll-to")
            if (!idElScrollTo) return

            const elScrollTo = document.getElementById(idElScrollTo)
            if (elScrollTo === null) return

            const duration = 0.5

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