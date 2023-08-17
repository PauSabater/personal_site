import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { scOpacityFade } from "../../assets/ts/utils/utils"
gsap.registerPlugin(CustomEase)



export function executeEnterAnimations(pageId: string, node: HTMLElement, route?: string) {
    console.log("node is")
    console.log(node)
    switch (pageId) {
        case 'page-project-post':
            setProjectPostEnterAnimation(node)
            break
        case 'page-projects':
            setProjectListEnterAnimation(node)
            break
        // case 'page-home':
        //     setPageFadeInAnimation(node)
        //     break
    }
}

export function executeExitAnimations(pageId: string, node: HTMLElement, route?: string) {

    switch (pageId) {
        case 'page-project-post':
            setProjectPostExitAnimation(node)
            break
        case 'page-projects':
            // setProjectPostExitAnimation(node)
            break
        case 'page-home':
            setPageFadeOutAnimation(node)
            break
    }
}

export function setPageFadeOutAnimation(node: HTMLElement) {
    // window.scrollTo(0, 0)
    gsap
        .timeline({ paused: true })
        .to(document.getElementById('page-overlay'), {
            opacity: 1,
            duration: scOpacityFade,
            delay: 0,
            ease: "power2.in",
        }, 0)
        .play();
}

export function setPageFadeInAnimation(node?: HTMLElement) {
    // window.scrollTo(0, 0)
    gsap
        .timeline({ paused: true })
        .to(document.getElementById('page-overlay'), {
            opacity: 0,
            duration: scOpacityFade,
            delay: 0,
            ease: "power2.in",
        }, 0)
        .play();
}

export function setProjectPostEnterAnimation(node: HTMLElement) {
    console.log("PROJECT POST ENTEEER")
    const elTransitionImages: HTMLElement | null = document.querySelector("#transition-images")
    gsap.set(elTransitionImages, {opacity: 1})
    window.scrollTo(0, 0)
}

export function setProjectPostExitAnimation(node: HTMLElement) {

}

export function setProjectListEnterAnimation(node: HTMLElement) {
    // window.scrollTo(0, 0)

}