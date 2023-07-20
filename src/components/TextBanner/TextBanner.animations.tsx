import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase";
import { isMobileScreen } from "../../assets/ts/utils/utils";
gsap.registerPlugin(ScrollTrigger, CustomEase)

export function setTextBannerAnimations(refTextBanner: React.MutableRefObject<null>) {
    let ctx = gsap.context(() => {

        // Reference element from component:
        let elTextBanner: HTMLElement | null = refTextBanner.current

        if (elTextBanner === null) return

        const elsTextLines: NodeListOf<HTMLParagraphElement> = (elTextBanner as HTMLElement).querySelectorAll("p")
        const elBtn = (elTextBanner as HTMLElement).querySelector("button")


        // Set timeline
        let tlTBanner = gsap.timeline()

        // Full banner opacity and translate:
        tlTBanner.fromTo(
            elTextBanner,
            {opacity: 0, y: 200},
            {opacity: 1, y: 0, duration: 0.4},
            'start'
        )
        // Text lines reveal effect:
        tlTBanner.fromTo(Array.from(elsTextLines),
            {opacity: 0, y: 100},
            {opacity: 1, y: 0, duration: 0.5, stagger: 0.05},
            'start'
        )
        // Text lines reveal effect:
        tlTBanner.fromTo(elBtn,
            {opacity: 0},
            {opacity: 1, duration: 0.3},
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
