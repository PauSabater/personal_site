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


    const homeLeaveHideElements = ()=> {
        gsap.to([
            document.querySelectorAll(`.card-container:not([data-path="${cardPath}"])`),
            document.querySelector('#work-banner-texts'),
            document.querySelector('#work-banner-heading')
        ],
        {opacity: 0, duration: 0.15})
    }

    // Image to transition to:
    const elImgProject = document.querySelector('#transition-img-papernest')

    const tlTransition = gsap.timeline()

    console.log("TRANSITION COMINS!!!")
    console.log(elImgContainer)
    console.log(elImg)

    if(elImg === null) return

    if (!isMountainsImg) {
        tlTransition
            .set(document.body, {overflow: 'hidden'})
            .to(elImgContainer, {
                y: `-=${(elImgContainer as HTMLElement).getBoundingClientRect().top}`,
                x: `-=${(elImgContainer as HTMLElement).getBoundingClientRect().left}`,
                xPercent: 0,
                yPercent: 0,
                width: '100vw',
                height: '100vh',
                duration: 1,
                ease: CustomEase.create("custom", easeOutLong),
                borderRadius: 0,
                onStart: ()=> {
                    if (document.querySelector("#page-home") !== null) homeLeaveHideElements()
                },
            }, 'start')
            .to(elImg, {...isViewportPropHigherThanEl(elImg) &&
                {
                    width: '100vw',
                    height: isMountainsImg
                        ? getProportionRelToElement(elImg.firstChild as HTMLElement) * Math.abs(window.innerHeight)
                        : 'auto',
                    duration: 1,
                    ease: CustomEase.create("custom", easeOutLong),
                },
                borderRadius: 0,
            }, 'start')

    } else {
        tlTransition
        .set(document.body, {overflow: 'hidden'})
        .to(elImgContainer, {
            y: `-=${(elImgContainer as HTMLElement).getBoundingClientRect().top}`,
            x: `-=${(elImgContainer as HTMLElement).getBoundingClientRect().left}`,
            xPercent: 0,
            yPercent: 0,
            width: '100vw',
            height: '100vh',
            duration: 1,
            ease: CustomEase.create("custom", easeOutLong),
            borderRadius: 0,
            onStart: ()=> {
                if (document.querySelector("#page-home") !== null) homeLeaveHideElements()
            },
        }, 'start')
        .to(elImg, {...isViewportPropHigherThanEl(elImg) &&
            {
                width: '100vw',
                height: isMountainsImg
                    ? getProportionRelToElement(elImg.firstChild as HTMLElement) * Math.abs(window.innerHeight)
                    : 'auto',
                duration: 1,
                ease: CustomEase.create("custom", easeOutLong),
            },
            borderRadius: 0,
        }, 'start')
    }
}