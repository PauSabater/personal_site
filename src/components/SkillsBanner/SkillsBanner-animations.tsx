import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export function setSkillsBannerAnimation(elBanner: HTMLElement) {

    let ctx = gsap.context(() => {

        const getOptObserver = (threshold: number)=> { return {
                root: null,
                rootMargin: "0px 0px 0% 0px",
                threshold: threshold
            }
        }

        const observer: IntersectionObserver = new IntersectionObserver((entries)=> observerCallback(entries), getOptObserver(0.3))
        const observerSkills: IntersectionObserver = new IntersectionObserver((entries)=> observerCallbackSkills(entries), getOptObserver(0.6))

        observer.observe(elBanner)
        observerSkills.observe(elBanner)

        const elsSkills = elBanner.querySelectorAll(".skill-container")
        const elsSkillsBar = elBanner.querySelectorAll(".level-bar")

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    gsap.to(elBanner, {opacity: 1, y: 0, duration: 0.6})
                    observer.unobserve(elBanner)
                }
            })
        }

        const observerCallbackSkills = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    gsap.to(elsSkills, {opacity: 1, duration: 0.6, stagger: 0.05})
                    gsap.to(elsSkillsBar, {x: 0, delay: 0.8})
                    observer.unobserve(elBanner)
                }
            })
        }

        // let timeline = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: elBanner,
        //         start: "top",
        //         end: "bottom -250%",
        //         markers: true,
        //         onLeave: () => {
        //             console.log("leavbeee")
        //         },
        //         // onEnterBack: () => {
        //         //     tlLightning.pause()
        //         //     gsap.to(card3Rain, {display: "none", opacity: "0"})
        //         // },
        //     }
        // })






    })

    return () => ctx.revert()

    // const elHeadingContainer: HTMLElement = (elContainerTexts as HTMLElement).querySelector("#work-banner-heading") as HTMLElement
    // const elLinesTextContainer: HTMLElement = (elContainerTexts as HTMLElement).querySelector("#work-banner-texts") as HTMLElement
    // const elsHeadings: NodeListOf<HTMLHeadingElement> = (elHeadingContainer as HTMLElement).querySelectorAll("h1")
    // const elsLinesText: NodeListOf<HTMLParagraphElement> = (elLinesTextContainer as HTMLElement).querySelectorAll("p")



    // const observer: IntersectionObserver = new IntersectionObserver((entries)=> observerCallback(entries), optObserver)
    // observer.observe(elHeadingContainer)
    // observer.observe(elLinesTextContainer)



}