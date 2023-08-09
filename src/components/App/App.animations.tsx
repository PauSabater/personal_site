import { easeOutLong } from "../../assets/ts/styles/styles";
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { enableScroll } from "../../assets/ts/utils/utils";
gsap.registerPlugin(CustomEase)

export const animationDurations = {
    exitOpacity: 0.75
}

export function executeEnterAnimations(pageId: string, node: HTMLElement) {
    console.log("node is")
    console.log(node)
    switch (pageId) {
        case 'page-project-post':
            setProjectPostEnterAnimation(node)
            break
    }
    // switch (pageId) {
    //     case 'page-projects':
    //         setProjectPostEnterAnimation(node)
    //         break
    // }
}

export function executeExitAnimations(pageId: string, node: HTMLElement) {
    console.log("EXIT ANIMATION "+pageId)

    console.log(pageId)
    switch (pageId) {
        case 'page-project-post':
            setProjectPostExitAnimation(node)
            break
    }
    switch (pageId) {
        case 'page-projects':
            // setProjectPostExitAnimation(node)
            break
    }
}


export function setPageOpacityAnimation(node: HTMLElement) {
    window.scrollTo(0, 0)
    gsap
        .timeline({ paused: true })
        .to(node, {
            opacity: 0,
            duration: animationDurations.exitOpacity,
            delay: 0,
            ease: "power2.in",
        }, 0)
        .play();
}

export function setProjectPostEnterAnimation(node: HTMLElement) {
    console.log("PROJECT POST ENTEEER")
    window.scrollTo(0, 0)
    gsap
        .timeline({ paused: true })
            .set(node.querySelector("#intro-article"), {
                y: '20vh'
            })
            .set(node.querySelector(".intro-container"), {
                y: '100px',
                onComplete: ()=> {setTimeout(()=> enableScroll(), 1005)}
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