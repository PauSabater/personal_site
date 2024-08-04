import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase";
// @ts-ignore -- TODO: solve declaration file from package
import { isMobileScreen } from "@pausabater/utils/dist/index.esm.js";
gsap.registerPlugin(ScrollTrigger, CustomEase)

export function setTextBannerAnimations(refTextBanner: React.MutableRefObject<null>) {

    let ctx = gsap.context(() => {
        const isMobile = isMobileScreen()

        // Reference element from component:
        let elTextBanner: HTMLElement | null = refTextBanner.current

        if (elTextBanner === null) return

        const elsTextLines: NodeListOf<HTMLParagraphElement> =
            (elTextBanner as HTMLElement).querySelectorAll(`${isMobile ? '.text-mobile p' : '.text-desktop p'}`)
        const elBtn = (elTextBanner as HTMLElement).querySelector(".cta")
        const elCanvas = document.querySelector("#text-banner-canvas")
        const elNoteLogo = document.querySelector("#note-logo")
        const elLowPerfLogo = document.querySelector("#low-perf-logo")

        let tlTBanner = gsap.timeline()

        tlTBanner.pause()
            // Full banner opacity and translate:
            .fromTo(
                elTextBanner,
                {y: isMobile ? window.innerHeight / 8 : window.innerHeight / 4},
                {y: 0, duration: 0.5},
                'start'
            )
            .fromTo(
                elTextBanner,
                {opacity: 0},
                {opacity: 1, duration: 0.75},
                'start'
            )
            // Btn appear:
            .fromTo(elBtn,
                {opacity: 0},
                {
                    opacity: 1, duration: 0.5,
                    onStart: ()=> {
                        elTextBanner?.setAttribute('data-animation-is-finished', '')
                        if (elLowPerfLogo) {
                            gsap.set(elLowPerfLogo.querySelectorAll("path"), {
                                strokeDashoffset: 0,
                                stagger: 0.15
                                // opacity: 1, duration: 0.5, delay: 0.3
                            })
                        }
                    },
                    onComplete: ()=> {
                        gsap.to(elNoteLogo, { opacity: 1, duration: 0.5, delay: 0.3 })
                    }
                },
                'end'
        )

        tlTBanner
            // Text lines reveal effect:
            .fromTo(Array.from(elsTextLines),
            {opacity: 0},
            {opacity: 1, y: 0, duration: 1, stagger: 0.075},
            'start')

        // Canvas is not showing on mobile
        if (!isMobileScreen()) {
            tlTBanner
                .to(elCanvas,{opacity: 1, duration: 0.5, delay: 0.5}, 'start')
        }

        tlTBanner.pause()

        const observer = new IntersectionObserver((entries)=> observerCallback(entries),
        {
            root: null,
            rootMargin: "0px 0px 0% 0px",
            threshold: 0.15
        })

        observer.observe(elTextBanner)

        const observerCallback = (entries: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    // Full banner opacity and translate:
                    tlTBanner.play()
                    observer.unobserve(elTextBanner as HTMLElement)
                }
            })
        }

    return () => ctx.revert()
    })
}
