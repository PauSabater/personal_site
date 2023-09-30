import gsap from "gsap"
// @ts-ignore -- TODO: solve declaration file from package
import { disableScroll, getGsapDistToCenterElXAxis, getGsapDistToCenterElYAxis, getScaleToCoverViewPort, isElLeftOfScreen, isMobileScreen, scEnterPageLong, scOpacityFade, scTransitionPage, scTransitionPageLong } from "@pausabater/utils/dist/index.esm.js"

export function setLeaveAnimation(elTarget: HTMLElement) {
    const elImg: HTMLElement | null = elTarget.querySelector("[data-transitioned-image]")

    if (elImg === null) return

    const tlTransition = gsap.timeline()
    const elsCardsToFade = document.querySelectorAll(`.project-card:not(#${elTarget.id})`)
    const skewAngle = isMobileScreen() ? 0 : 0

    tlTransition
        .set(elImg, {borderRadius: '0px'})
        .to(elImg, {
            y: getGsapDistToCenterElYAxis(elImg),
            x: getGsapDistToCenterElXAxis(elImg),
            scale: getScaleToCoverViewPort(elImg as HTMLElement),
            duration: scTransitionPageLong,
            ease: "power4.easeOut",
            onStart: ()=> {
                disableScroll()
                const durSkew = scTransitionPageLong - 0.50
                gsap.to(elImg, {
                    skewY: isElLeftOfScreen(elImg) ? `-${skewAngle}deg` : `${skewAngle}deg`,
                    duration: durSkew
                })
                gsap.to(elImg, {
                    skewY: '0deg',
                    duration: durSkew,
                    delay: durSkew - 0.15
                })
            }
        }, 'start')
        .to([elsCardsToFade,
            document.querySelector(".intro-container"),
            document.querySelector(".cta-container"),
            elTarget.firstElementChild
        ], {
            opacity: 0,
            duration: scOpacityFade
        }, 'start')
    tlTransition.play()
}

export function setProjectListEnterAnimation() {
    window.scrollTo(0, 0)
    gsap
    .timeline({ paused: true })
        .set (document.getElementById("page-overlay"), {opacity: 1})
        .to (document.getElementById("page-overlay"), {
            opacity: 0,
            duration: scOpacityFade,
            ease: "power2.in",
        }, 'start')
        .fromTo(document.getElementById("page-projects"), {
            opacity: 0,
            duration: scEnterPageLong,
            y: "10vh",
            ease: "power1.inOut",
        }, {
            opacity: 1,
            y: "0"
        }, 'start')
    .play();
}