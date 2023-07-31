import { easeOutLong } from "../../assets/ts/styles/styles";
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
gsap.registerPlugin(CustomEase)

export function executeEnterAnimations(pageId: string, node: HTMLElement) {
    switch (pageId) {
        case 'page-project-post':
            setProjectPostEnterAnimation(node)
            break
    }
}

export function executeExitAnimations(pageId: string, node: HTMLElement) {
    switch (pageId) {
        case 'page-project-post':
            setProjectPostExitAnimation(node)
            break
    }
}

export function setProjectPostEnterAnimation(node: HTMLElement) {
    window.scrollTo(0, 0)
    gsap
        .timeline({ paused: true })
            .set(document.body, {overflow: 'visible'})
            .set(node.querySelector("#intro-article"), {
                y: '20vh'
            })
            .set(node.querySelector(".intro-container"), {
                y: '100px'
            })
        // .to(node.querySelector("#post-container-image"), {
        //     height: '75vh',
        //     duration: 0.8,
        //     delay: 0.2,
        //     ease: CustomEase.create("custom", easeOutLong),
        // }, 0)
        // .to(node.querySelector("#intro-article"), {
        //     y: '0',
        //     duration: 0.8,
        //     delay: 0.2,
        //     ease: CustomEase.create("custom", easeOutLong),
        // }, 0)
        // .to(node.querySelector(".intro-container"), {
        //     y: '0',
        //     opacity: '1',
        //     duration: 0.8,
        //     delay: 0.6,
        //     ease: CustomEase.create("custom", easeOutLong),
        // }, 0)
        .play();
}

export function setProjectPostExitAnimation(node: HTMLElement) {
    gsap
        .timeline({ paused: true })
        .to(node, {
            opacity: 0,
            duration: 0.5,
            delay: 0,
            ease: CustomEase.create("custom", easeOutLong),
        }, 0)
        .play();
}