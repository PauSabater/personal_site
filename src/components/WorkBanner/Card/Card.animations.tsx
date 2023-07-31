import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { getProportionRelToElement, getProportionRelToViewport, isViewportPropHigherThanEl } from "../../../assets/ts/utils/utils"
import { easeOutLong } from "../../../assets/ts/styles/styles"
gsap.registerPlugin(CustomEase)


export function setCardTransitionAnimation(elImgContainer: HTMLElement, cardPath: string) {

    const elImage: HTMLImageElement | null = (elImgContainer as HTMLElement).querySelector("img")
    const elSvg: SVGSVGElement | null = (elImgContainer as HTMLElement).querySelector("svg")
    const elContainerMountains: HTMLElement | null = elImgContainer.querySelector("#card-3-img-wrap")

    let elImg: HTMLElement | SVGSVGElement | null
    const isMountainsImg = elContainerMountains !== null

    if (elContainerMountains !== null) {
        elImg = elContainerMountains
    } else {
        elImg = elImage === null ? elSvg : elImage
    }


    if (elImg === null) return

    // Elements to hide during transition:
    const elsCards = document.querySelectorAll(`.card-container:not([data-path="${cardPath}"])`)
    const elCard = document.querySelector(`.card-container:where([data-path="${cardPath}"])`)
    const elWorkBannerTexts = document.querySelector('#work-banner-texts')
    const elWorkBannerHeading = document.querySelector('#work-banner-heading')

    // Image to transition to:
    const elImgProject = document.querySelector('#transition-img-papernest')

    const tlTransition = gsap.timeline()

    const replaceWindowLocation = (path: string) => {
        window.location.replace(`${window.location}${path}`)
    }

    console.log("TRANSITION COMINS!!!")
    console.log(elImgContainer)
    console.log(elImg)

    tlTransition
        .set(document.body, {overflow: 'hidden'})
        .to([elsCards, elWorkBannerTexts, elWorkBannerHeading], {opacity: 0, duration: 0.15}, 'start')
        .to(elImgContainer, {
            y: `-=${(elImgContainer as HTMLElement).getBoundingClientRect().top}`,
            x: `-=${(elImgContainer as HTMLElement).getBoundingClientRect().left}`,
            xPercent: 0,
            yPercent: 0,
            width: '100vw',
            height: '100vh',
            duration: 0.8,
            ease: CustomEase.create("custom", easeOutLong),
            borderRadius: 0
        }, 'start')
        .to(elImg, {...isViewportPropHigherThanEl(elImg) &&
            {
                width: '100vw',
                height: isMountainsImg
                    ? getProportionRelToElement(elImg.firstChild as HTMLElement) * Math.abs(window.innerHeight)
                    : 'auto',
                duration: 0.8,
                ease: CustomEase.create("custom", easeOutLong),
            },
            borderRadius: 0,
        }, 'start')
        // .set(elImgProject, {opacity: 1})
        // .set(elImgProject?.parentElement as HTMLElement, {overflow: 'hidden'})
        // .to(elCard, {
        //     opacity: 0,
        //     duration: 0.1,
        //     //onComplete: ()=> replaceWindowLocation(cardPath)
        // })
        // .to(elImgProject?.parentElement as HTMLElement, {
        //     height: '40vh',
        //     duration: 1,
        //     ease: "power4.out"
        // }, 'end')
}