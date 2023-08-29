import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase";
import { isMobileScreen, isVerticalMobileTablet } from "../../assets/ts/utils/utils";
gsap.registerPlugin(ScrollTrigger, CustomEase)

export function setTextBannerAnimations(refTextBanner: React.MutableRefObject<null>) {
    let ctx = gsap.context(() => {

        // Reference element from component:
        let elTextBanner: HTMLElement | null = refTextBanner.current

        if (elTextBanner === null) return

        const elsTextLines: NodeListOf<HTMLParagraphElement> =
            (elTextBanner as HTMLElement).querySelectorAll(`${isMobileScreen() ? '.text-mobile p' : '.text-desktop p'}`)
        const elBtn = (elTextBanner as HTMLElement).querySelector("Cta")
        const elCanvas = document.querySelector("#text-banner-canvas")

        let tlTBanner = gsap.timeline()

        console.log("SVG IS")
        // console.log((elTextBanner as HTMLElement).querySelector("#text-banner-canvas svg"))

        tlTBanner
        // Full banner opacity and translate:
        .fromTo(
            elTextBanner,
            {opacity: 0, y: 200},
            {opacity: 1, y: 0, duration: 0.4},
            'start'
        )
        // Text lines reveal effect:
        .fromTo(Array.from(elsTextLines),
            {opacity: 0, y: 100},
            {opacity: 1, y: 0, duration: 0.5, stagger: 0.05},
            'start'
        )
        // Canvas:
        .to(elCanvas,{opacity: 1, duration: 0.5, delay: 0.7}, 'start')
        // Btn appear:
        .fromTo(elBtn,
            {opacity: 0},
            {
                opacity: 1, duration: 0.3,
                onComplete: ()=> {
                    elTextBanner?.setAttribute('data-animation-is-finished', '')
                    gsap.to((elTextBanner as HTMLElement).querySelector("svg"), { opacity: 1, duration: 0.5, delay: 0.5 })
                }
            },
            'end'
        )

        tlTBanner.pause()


        const observer = new IntersectionObserver((entries)=> observerCallback(entries),
        {
            root: null,
            rootMargin: "0px 0px 0% 0px",
            threshold: 0.3
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
