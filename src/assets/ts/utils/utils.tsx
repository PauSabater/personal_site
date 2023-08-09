const mediaDesktop: string = `screen and (max-width: 900px)`
const mediaVerticalMobileTablet: string = `screen and (max-width: 1023px) and (max-aspect-ratio: 1/1)`

export function isMobileScreen(): boolean {
    return window.matchMedia(mediaDesktop).matches
}

export function isVerticalMobileTablet(): boolean {
    return window.matchMedia(mediaVerticalMobileTablet).matches
}

//mobile-tablet


export function getTodayDayNum(): string {
    return (new Date()).getDate().toString().padStart(2, '0')
}

export function getTodayMonthName(): string {
    return (new Date()).toLocaleString("en-us", { month: "short" })
}

export function isViewportPropHigherThanEl(elCompare: HTMLElement | SVGSVGElement): boolean {
    return getViewportAspectRatio() > getElementProportion(elCompare)
}

export function getProportionRelToViewport(elCompare: HTMLElement | SVGSVGElement): number {
    return getElementProportion(elCompare) / getViewportAspectRatio()
}

export function getProportionRelToElement(elCompare: HTMLElement | SVGSVGElement): number {
    return getViewportAspectRatio() / getElementProportion(elCompare)
}

export function getElementProportion(element: HTMLElement | SVGSVGElement) {
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
    // return window.innerWidth / 2 - (elTarget.getBoundingClientRect().left + (elTarget.getBoundingClientRect().width / 2))
    return window.innerHeight / 2 - (elTarget.getBoundingClientRect().top + (elTarget.getBoundingClientRect().height / 2))

}

export function getGsapDistToCenterElXAxis(elTarget: HTMLElement | SVGSVGElement) {
    const distance = getElXAxisDistCenterToCenterViewport(elTarget)
    return distance > 0 ? distance.toString() : `-=${Math.abs(distance)}`
}

export function getGsapDistToCenterElYAxis(elTarget: HTMLElement | SVGSVGElement) {
    const distance = getElYAxisDistCenterToCenterViewport(elTarget)
    console.log("we return ")
    console.log(distance > 0 ? distance.toString() : `-=${Math.abs(distance)}`)
    return distance > 0 ? distance.toString() : `-=${Math.abs(distance)}`
    return `-=${Math.abs(distance)}`
}

export function disableScroll() {
    (document.body.parentElement as HTMLElement).style.overflowY = 'hidden';
}

export function enableScroll() {
    (document.body.parentElement as HTMLElement).style.overflowY = 'visible';
}