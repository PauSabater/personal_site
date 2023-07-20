const mediaDesktop: string = `screen and (max-width: 900px)`

export function isMobileScreen(): boolean {
    return window.matchMedia(mediaDesktop).matches
}


export function getTodayDayNum() {
    return (new Date()).getDate().toString().padStart(2, '0')
}

export function isElProportionHigherThanViewport(elCompare: HTMLImageElement | SVGSVGElement): boolean {
    return getViewportProportion() > getElementProportion(elCompare)
}

export function getElementProportion(element: HTMLImageElement | SVGSVGElement) {
    return element.getBoundingClientRect().width / element.getBoundingClientRect().height
}

export function getViewportProportion() {
    return window.innerWidth / window.innerHeight
}