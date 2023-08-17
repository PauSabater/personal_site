import gsap from "gsap"
import { disableScroll, getGsapDistToCenterElXAxis, getGsapDistToCenterElYAxis, getScaleToCoverViewPort, isElLeftOfScreen, scOpacityFade, scTransitionPage } from "../../assets/ts/utils/utils"

export function setLeaveAnimation(elTarget: HTMLElement) {
    // setCardTransitionAnimation()
    const elImg: HTMLElement | null = elTarget.querySelector("[data-transitioned-image]")

    if (elImg === null) return

    const tlTransition = gsap.timeline()
    const elsCardsToFade = document.querySelectorAll(`.project-card:not(#${elTarget.id})`)

    tlTransition
        .set(elImg, {borderRadius: '0px'})
        .to(elImg, {
            y: getGsapDistToCenterElYAxis(elImg),
            x: getGsapDistToCenterElXAxis(elImg),
            scale: getScaleToCoverViewPort(elImg as HTMLElement),
            duration: scTransitionPage,
            ease: "power1.inOut",
            onStart: ()=> {
                disableScroll()
                const durSkew = scTransitionPage - 0.30
                gsap.to(elImg, {
                    skewY: isElLeftOfScreen(elImg) ? '-5deg' : '5deg',
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
        .from(document.getElementById("page-projects"), {
            duration: scTransitionPage,
            y: "10vh",
            ease: "power1.inOut",
        }, 'start')
    .play();
}