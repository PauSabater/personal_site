import gsap from "gsap"

const mediaVerticalMobileTablet: string = `screen and (max-width: 1023px) and (max-aspect-ratio: 1/1)`
const mediaMobile: string = `screen and (max-width: 768px)`
export const matchMediaMobile: string = `(max-width: 768px)`

// Time animations
export const msTransitionPage = 600
export const msTransitionPageLong = 1100
export const msEnterPageLong = 1000
export const scTransitionPage = msTransitionPage / 1000
export const scTransitionPageLong = msTransitionPageLong / 1000
export const scEnterPageLong = msEnterPageLong / 1000
export const scOpacityFade = scTransitionPage - 0.1


export function isMobileScreen(): boolean {
    return window.matchMedia(mediaMobile).matches
}

export function isVerticalMobileTablet(): boolean {
    return window.matchMedia(mediaVerticalMobileTablet).matches
}

export function getTodayDayNum(): string {
    return (new Date()).getDate().toString().padStart(2, '0')
}

export function getTodayMonthName(): string {
    return (new Date()).toLocaleString("en-us", { month: "short" })
}

export function isViewportPropHigherThanEl(elCompare: HTMLElement | SVGSVGElement): boolean {
    return getViewportAspectRatio() > getElementAspectRatio(elCompare)
}

export function getProportionRelToViewport(elCompare: HTMLElement | SVGSVGElement): number {
    return getElementAspectRatio(elCompare) / getViewportAspectRatio()
}

export function getProportionRelToElement(elCompare: HTMLElement | SVGSVGElement): number {
    return getViewportAspectRatio() / getElementAspectRatio(elCompare)
}

export function getElementAspectRatio(element: HTMLElement | SVGSVGElement) {
    return element.getBoundingClientRect().width / element.getBoundingClientRect().height
}

export function getViewportAspectRatio() {
    return window.innerWidth / window.innerHeight
}

export function getScaleToCoverViewPort(elTarget: HTMLElement | SVGSVGElement) {
    return isViewportPropHigherThanEl(elTarget)
        // Wider viewport
        ? window.innerWidth / elTarget.getBoundingClientRect().width
        // Higher viewport
        : window.innerHeight / elTarget.getBoundingClientRect().height
}

export function getElXAxisDistCenterToCenterViewport(elTarget: HTMLElement | SVGSVGElement) {
    return window.innerWidth / 2 - (elTarget.getBoundingClientRect().left + (elTarget.getBoundingClientRect().width / 2))
}

export function getElYAxisDistCenterToCenterViewport(elTarget: HTMLElement | SVGSVGElement) {
    return window.innerHeight / 2 - (elTarget.getBoundingClientRect().top + (elTarget.getBoundingClientRect().height / 2))
}

export function getGsapDistToCenterElXAxis(elTarget: HTMLElement | SVGSVGElement) {
    const distance = getElXAxisDistCenterToCenterViewport(elTarget)
    return distance > 0 ? distance.toString() : `-=${Math.abs(distance)}`
}

export function getGsapDistToCenterElYAxis(elTarget: HTMLElement | SVGSVGElement) {
    const distance = getElYAxisDistCenterToCenterViewport(elTarget)
    return distance > 0 ? distance.toString() : `-=${Math.abs(distance)}`
}

export function isElLeftOfScreen(elTarget: HTMLElement | SVGSVGElement) {
    return getElXAxisDistCenterToCenterViewport(elTarget) >= 0 ? true : false
}

export function disableScroll() {
    (document.body.parentElement as HTMLElement).style.overflowY = 'hidden'
}

export function enableScroll() {
    (document.body.parentElement as HTMLElement).style.overflowY = 'visible'
}

export function hideAllTransitionImages() {
    const elsImages: NodeListOf<HTMLElement> = document.querySelectorAll(".transition-images-container")
    Array.from(elsImages).forEach((img) => {
        gsap.set(img, {opacity: 0})
        gsap.set(img, {height: '100vh'})
    })
}

export function displayTransitionImage() {
    const elTransitionImages: HTMLElement | null = document.querySelector("#transition-images")
    if (elTransitionImages === null) return
    elTransitionImages.style.opacity = "0"
    const elsImages: NodeListOf<HTMLElement> = elTransitionImages.querySelectorAll(".transition-images-container")
    Array.from(elsImages).forEach((img) => img.style.opacity = "0")
}


export function hidePageOverlay() {
    const elPageOverlay: HTMLElement | null = document.getElementById("page-overlay")
    if (elPageOverlay !== null) gsap.set(elPageOverlay, {opacity: 0})
}

export function hasPageBeenLoaded() {
    return document.querySelector(".page-loader")?.classList.contains("loader-shown")
}

export function hasElementBeenScrolled(elCheckHeight: HTMLElement) {
    const scrolledHeight = window.scrollY
    let distance = 0

    if (elCheckHeight && elCheckHeight.offsetParent) {
        do {
            distance += elCheckHeight.offsetTop;
            elCheckHeight = elCheckHeight.offsetParent as HTMLElement
        } while (elCheckHeight);
    }

    return scrolledHeight > distance
}