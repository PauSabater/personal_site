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
    return getViewportProportion() > getElementProportion(elCompare)
}

export function getProportionRelToViewport(elCompare: HTMLElement | SVGSVGElement): number {
    return getElementProportion(elCompare) / getViewportProportion()
}

export function getProportionRelToElement(elCompare: HTMLElement | SVGSVGElement): number {
    return getViewportProportion() / getElementProportion(elCompare)
}

export function getElementProportion(element: HTMLElement | SVGSVGElement) {
    return element.getBoundingClientRect().width / element.getBoundingClientRect().height
}

export function getViewportProportion() {
    return window.innerWidth / window.innerHeight
}