import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export function setMethodSectionAnimation(elMethodSection: HTMLElement) {

    let ctx = gsap.context(() => {

        const elTitle = elMethodSection.querySelector(".split-letters-container")
        if (elTitle === null) return

        const elTitleChars: NodeListOf<HTMLElement> = elTitle.querySelectorAll("pre")
        const elsCollapsible = elMethodSection.querySelectorAll(".container-collapsible")

        const getOptObserver = (threshold: number)=> { return {
                root: null,
                rootMargin: "0px 0px 0% 0px",
                threshold: threshold
            }
        }

        const observer: IntersectionObserver = new IntersectionObserver((entries)=> observerCallback(entries), getOptObserver(1))
        observer.observe(elTitle)

        Array.from(elsCollapsible).forEach((elCollapsible) => {
            observer.observe(elCollapsible)
        })

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting && entry.target.className === elTitle.className) {
                    gsap.to(elTitleChars, {x: 0, duration: 0.35, opacity: 1, stagger: 0.02})
                    observer.unobserve(elTitle)
                }

                if (entry.isIntersecting && entry.target.className === elsCollapsible[0].className) {
                    const elLine = entry.target.querySelector(".line")
                    gsap.to(entry.target.querySelector("h2"), {y: 0, duration: 1.2, opacity: 1})
                    gsap.to(elLine, {scaleX: '100%', opacity: 1, duration: 2})
                    observer.unobserve(elTitle)
                }
            })
        }
    })

    return () => ctx.revert()
}