import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import CustomEase from "gsap/CustomEase"
import { getCloudsAnimation } from "../WorkBanner/WorkBanner.animations"
import { disableScroll, enableScroll, getGsapDistToCenterElXAxis, getGsapDistToCenterElYAxis, getProportionRelToElement, getScaleToCoverViewPort, isElLeftOfScreen, isViewportPropHigherThanEl, scEnterPageLong, scTransitionPage, scOpacityFade } from "../../assets/ts/utils/utils"
import { easeOutLong } from "../../assets/ts/styles/styles"

gsap.registerPlugin(ScrollTrigger, CustomEase)


export function leaveFromArrowClick() {
    const elTransitionImages: HTMLElement | null = document.querySelector("#transition-images")
    const elPage: HTMLElement | null = document.getElementById("page-project-post")
    document.querySelector("#page-content")?.setAttribute("data-fade-in", "")

    if (elTransitionImages === null || elPage === null) return

    gsap
        .timeline({ paused: true })
        .to (document.getElementById("page-overlay"), {
            opacity: 1,
            duration: 0.6
        }, 'start')
        .to([elPage, elTransitionImages], {
            duration: scTransitionPage,
            x: "-=6vw",
            delay: 0,
            ease: "power2.inOut",
            onComplete: ()=> {
                gsap.set(elPage, {x: 0})
                gsap.set(elTransitionImages, {x: 0})
            }
        }, 'start')
        .play();
}

export function leaveFromMoreProjectsClick(e: React.MouseEvent) {
    const elTarget: HTMLElement | null = e.target as HTMLElement

    const elTransitionImages: HTMLElement | null = document.querySelector("#transition-images")
    const elPage: HTMLElement | null = document.getElementById("page-project-post")
    const elImgContainer: HTMLElement | null = elTarget.querySelector(".img-container")
    const elImg: HTMLElement | null = elTarget.querySelector("[data-transitioned-image]")


    if (elImgContainer === null || elImg === null) return
    if (elTransitionImages === null || elPage === null) return

    const elMoreProjects: HTMLElement | null = elPage.querySelector(`.more-projects-link:not(#${elTarget.id})`)

    gsap.timeline({ paused: true })
        .set(elImg, {borderRadius: '0px'})
        .to(elImg, {
            y: getGsapDistToCenterElYAxis(elImg as HTMLElement),
            x: getGsapDistToCenterElXAxis(elImg as HTMLElement),
            scale: getScaleToCoverViewPort(elImg as HTMLElement),
            duration: 1,
            onStart: ()=> {
                disableScroll()
                const durSkew = 0.5
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
        .to([
                elMoreProjects,
                elPage.firstElementChild,
                elPage.firstElementChild?.nextElementSibling,
                elTransitionImages
            ], {
            duration: 0.3,
            opacity: 0,
            delay: 0,
            ease: "power1.inOut",
            onComplete: ()=> {
                gsap.set(elPage, {x: 0})
                gsap.set(elTransitionImages, {x: 0})
            }
        }, 'start')
        .play();
}

export function setMountainsScale(elContainer: HTMLElement) {
        const svgSkyDarkening = (elContainer as HTMLElement).querySelector("#sky-darkening") as HTMLElement

        gsap.set([
            (elContainer as HTMLElement).querySelectorAll("img"),
            (elContainer as HTMLElement).querySelectorAll("svg"),
        ], {
            attr: {transform: `translate(50, 50) scale(${getScaleToCoverViewPort(svgSkyDarkening)})`}
        })
        gsap.set(svgSkyDarkening, {opacity: 0})
    }

export function setMountainsAnimationObserver() {
        const getOptObserver = (threshold: number)=> { return {
            root: null,
            rootMargin: "0px 0px 0% 0px",
            threshold: threshold
        }
    }

    const elObserve: HTMLElement | null = document.getElementById(`transition-img-mountains`)
    if (elObserve === null) return

    const observer: IntersectionObserver = new IntersectionObserver(
        (entries)=> observerCallback(entries), getOptObserver(0.925)
    )

    observer.observe(elObserve)

    setMountainsInitialState(elObserve)

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
                if (window.scrollY > 5) {
                    reverseMountainsAnimation(elObserve)
                }
            } else {
                getMountainsAnimation(elObserve).play()
            }
        })
    }
}

export function reverseMountainsAnimation(container: HTMLElement) {
    const elMoon: HTMLElement = (container as HTMLElement).querySelector('#moon') as HTMLElement
    const elDarkeningLayer: HTMLElement = (container as HTMLElement).querySelector('#darkening-layer') as HTMLElement
    const elSkyDarkeningImg: HTMLElement = (container as HTMLElement).querySelector('#sky-darkening-img') as HTMLElement
    const elsClouds = (container as HTMLElement).querySelectorAll('.cloud') as NodeListOf<Element>
    const elRain = (container.parentElement as HTMLElement).querySelector('#rain-container')

    gsap.timeline()
        .to([elMoon, elRain, elDarkeningLayer, elSkyDarkeningImg, elsClouds], {
            opacity: '0',
            duration: 0.75
        }, 'start')
        .to(elMoon, {
            opacity: '1',
            duration: 0.75,
        }, 'start')

    gsap.set(elRain, {opacity: 0})
}

function setMountainsInitialState(container: HTMLElement) {
    const elMoon: HTMLElement = (container as HTMLElement).querySelector('#moon') as HTMLElement
    const elDarkeningLayer: HTMLElement = (container as HTMLElement).querySelector('#darkening-layer') as HTMLElement
    const elSkyDarkeningImg: HTMLElement = (container as HTMLElement).querySelector('#sky-darkening-img') as HTMLElement
    const elsClouds = (container as HTMLElement).querySelectorAll('.cloud') as NodeListOf<Element>
    const rain = (container.parentElement as HTMLElement).querySelector('#rain-container')

    gsap.set(rain, {opacity: '0', display: "block"})
    gsap.set(elMoon, {opacity: '1'})
    gsap.set([elDarkeningLayer, elSkyDarkeningImg, elsClouds], {opacity: '0'})
}

export function getMountainsAnimation(container: HTMLElement): gsap.core.Timeline {

        const elMoon: HTMLElement = (container as HTMLElement).querySelector('#moon') as HTMLElement
        const elDarkeningLayer: HTMLElement = (container as HTMLElement).querySelector('#darkening-layer') as HTMLElement
        const elSkyDarkeningImg: HTMLElement = (container as HTMLElement).querySelector('#sky-darkening-img') as HTMLElement
        const elsClouds = (container as HTMLElement).querySelectorAll('.cloud') as NodeListOf<Element>
        const duration: number = 0.7
        const delay: number = 0

        const tl = gsap.timeline()
            .to(elMoon, {
                opacity: 0,
                duration: duration - 0.2,
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
                delay: delay,
                onStart: ()=> {
                    const cloudAnimation = getCloudsAnimation(container)
                    cloudAnimation.play()
                }
            }, 0)
            .to((container.parentElement as HTMLElement).querySelector('#rain-container'),
                {opacity: "0.4"})
        tl.pause()

        return tl
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

export function executePageEnterAnimation(img: string) {
        const idImg: string = `transition-img-${img}`
        const elImgContainer = document.getElementById(idImg)

        // Reset all transition img except the one with the corresponding id
        const elsImgContainer = document.querySelectorAll(".transition-images-container")
        Array.from(elsImgContainer).forEach((el)=> {
            gsap.set(el, {height: '100vh'})
            if (el.id !== idImg) gsap.set(el, {opacity: 0})
        })

        if (elImgContainer === null) return

        // const easeAnimations = "power2.inOut"
        // const easeAnimations = CustomEase.create("custom", easeOutLong)
        const easeAnimations = CustomEase.create("custom", "M0,0,C0.29,0,0.359,0.227,0.406,0.328,0.462,0.448,0.41,0.34,0.464,0.458,0.484,0.548,0.552,0.77,0.615,0.864,0.69,0.975,0.704,1,1,1")

        gsap
        .timeline({ paused: true })
            .set(document.querySelector("#intro-article"), {
                opacity: 0
            })
            .set(document.querySelector(".intro-container"), {
                y: '100px',
                opacity: 0
            })
            .to(document.querySelector("#intro-article"), {
                opacity: 1,
                duration: scOpacityFade,
                delay: 0,
                ease: easeAnimations,
                onStart: ()=> fadeInPost()
            }, 'start')
            .to(elImgContainer, {
                height: '75vh',
                duration: scEnterPageLong,
                ease: easeAnimations,
            }, 'start')
            .fromTo(document.querySelector("#page-project-post"), {
                y: '50vh'
            },
            {
                y: '0',
                duration: scEnterPageLong,
                opacity: 1,
                ease: easeAnimations,
            }, 'start')
            .to(document.querySelector(".intro-container"), {
                y: 0,
                opacity: 1,
                duration: scEnterPageLong,
                ease: easeAnimations,
                onStart: ()=> enableScroll()
            }, 'start')
            .play()
}

/*
    Fades in the overlay at component mount, used on next project click
*/
export function fadeInPost() {
    const elPageContent = document.querySelector("#page-content")

    if (elPageContent?.hasAttribute("data-fade-in")) {
        elPageContent?.removeAttribute("data-fade-in")

        const elOverlay = document.getElementById("page-overlay")
        gsap.set(elOverlay, {opacity: 1})
        gsap.to(elOverlay, {opacity: 0, duration: 0.35, ease: "power1.in"})
    }
}