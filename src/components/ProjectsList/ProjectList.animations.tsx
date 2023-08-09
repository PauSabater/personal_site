import gsap from "gsap"
import { disableScroll, getGsapDistToCenterElXAxis, getGsapDistToCenterElYAxis, getScaleToCoverViewPort } from "../../assets/ts/utils/utils"
import { el } from "@faker-js/faker"

export function setLeaveAnimation(elTarget: HTMLElement) {
    // setCardTransitionAnimation()
    const elImg: HTMLElement | null = elTarget.querySelector("[data-transitioned-image]")

    if (elImg === null) return

    const tlTransition = gsap.timeline()
    const elsCardsToFade = document.querySelectorAll(`.project-card:not(#${elTarget.id})`)
    const elImgRefSize = elImg.id === 'card-3-img-wrap' ? elImg.querySelector("#sky-darkening") : elImg

    tlTransition
        // .set(document.body, {overflow: 'hidden'})
        // .set(document.body, {height: 'auto'})
        .set(elImg, {borderRadius: '0px'})
        .to(elImg, {
            y: getGsapDistToCenterElYAxis(elImg),
            x: getGsapDistToCenterElXAxis(elImg),
            scale: getScaleToCoverViewPort(elImg as HTMLElement),
            duration: 1,
            onStart: ()=> {
                disableScroll()
                const durSkew = 0.35
                gsap.to(elImg, {skewY: '5deg', duration: durSkew})
                gsap.to(elImg, {skewY: '0deg', duration: durSkew, delay: durSkew})
            }
        }, 'start')
        .to([elsCardsToFade,
            document.querySelector(".intro-container"),
            document.querySelector(".cta-container"),
            elTarget.firstElementChild
        ], {
            opacity: 0,
            duration: 0.3
        }, 'start')
    tlTransition.play()
}