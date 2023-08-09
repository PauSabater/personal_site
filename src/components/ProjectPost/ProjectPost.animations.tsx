import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { getCloudsAnimation } from "../WorkBanner/WorkBanner.animations"
import { getProportionRelToElement } from "../../assets/ts/utils/utils"
gsap.registerPlugin(ScrollTrigger)

export function setMountainsAnimation(container: HTMLElement) {

    let ctx = gsap.context(() => {

        const elMoon: HTMLElement = (container as HTMLElement).querySelector('#moon') as HTMLElement
        const elDarkeningLayer: HTMLElement = (container as HTMLElement).querySelector('#darkening-layer') as HTMLElement
        const elSkyDarkeningImg: HTMLElement = (container as HTMLElement).querySelector('#sky-darkening-img') as HTMLElement
        const elLightning: HTMLElement = (container as HTMLElement).querySelector('#lightning') as HTMLElement
        const elsClouds = (container as HTMLElement).querySelectorAll('.cloud') as NodeListOf<Element>


        const duration: number = 1.5
        const delay: number = 1

        const tl = gsap.timeline()
            .to(elMoon, {
                opacity: 0,
                duration: duration - 1,
                delay: delay
            }, 0)
            .to(elDarkeningLayer, {
                opacity: 0.3,
                duration: duration,
                delay: delay
            }, 0)
            .to(elSkyDarkeningImg, {
                opacity: "0.6",
                duration: duration,
                delay: delay
            }, 0)
            .to(elsClouds, {
                opacity: "0.7",
                duration: duration + 0.5,
                delay: delay + 0.5,
                onStart: ()=> {
                    const cloudAnimation = getCloudsAnimation(container)
                    cloudAnimation.play()
                },
                onComplete: ()=> {
                    gsap.to((container.parentElement as HTMLElement).querySelector('#rain-container'),
                        {display: "block", opacity: "0.25", duration: 0.5}
                    )
                },
            }, 0)

        tl.play()

        gsap.to((container.parentElement as HTMLElement).querySelector('#rain-container'),
            {display: "block", opacity: "0.25", delay: 2}
        )

    })

    return () => ctx.revert()
}

export function executeEnteringMountainAnimation(elImgMountainContainer: HTMLElement) {
    elImgMountainContainer.style.height = `${window.innerHeight.toString()}px`
    elImgMountainContainer.style.width = '100vw'

    gsap
        .set([
            elImgMountainContainer,
            elImgMountainContainer.querySelectorAll("img"),
            elImgMountainContainer.querySelectorAll("svg")
        ], {
            height: `${(getProportionRelToElement(elImgMountainContainer.firstElementChild as HTMLElement) * window.innerHeight).toString()}px`,
            width: '100vw'
        })


}