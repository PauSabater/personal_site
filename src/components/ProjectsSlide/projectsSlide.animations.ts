import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export function setProjectSlideAnimations() {

    const elContainer = document.getElementById("projects-slider-section")
    const elsSections = gsap.utils.toArray(".project-section")

    if (elContainer === null) return

    let ctx = gsap.context(() => {
        let sections = gsap.utils.toArray(".panel");

        console.log("HEY LENGTH IS")
        console.log(elsSections.length)

        gsap.to(elsSections, {
            xPercent: 250 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                start: "top top",
                markers: true,
                trigger: elContainer,
                pin: true,
                scrub: 0.1,
                // snap: 1 / (sections.length - 1),
                // base vertical scrolling on how wide the container is so it feels more natural.
                end: () =>  "+=" + (elContainer.offsetWidth)
            }
        });
    })

    return () => ctx.revert()
}