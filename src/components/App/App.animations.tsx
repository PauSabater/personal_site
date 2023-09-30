// @ts-ignore -- TODO: solve declaration file from package
import { scOpacityFade } from "@pausabater/utils/dist/index.esm.js"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
gsap.registerPlugin(CustomEase)

export function executeEnterAnimations(pageId: string, node: HTMLElement, route?: string) {

    switch (pageId) {
        case 'page-project-post':
            setProjectPostEnterAnimation(node)
            break
        case 'page-projects':
            break
    }
}

export function executeExitAnimations(pageId: string, node: HTMLElement, route?: string) {

    switch (pageId) {
        case 'page-project-post':
            break
        case 'page-projects':
            break
        case 'page-home':
            // setPageFadeOutAnimation()
            break
    }
}

export function setPageFadeOutAnimation() {
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

export function setPageFadeInAnimation() {
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
    const elTransitionImages: HTMLElement | null = document.querySelector("#transition-images")
    gsap.set(elTransitionImages, {opacity: 1})
    window.scrollTo(0, 0)
}