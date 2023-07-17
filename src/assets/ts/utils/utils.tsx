const mediaDesktop: string = `screen and (max-width: 900px)`

export function isMobileScreen(): boolean {
    return window.matchMedia(mediaDesktop).matches
}


export function getTodayDayNum() {
    return (new Date()).getDate().toString().padStart(2, '0')
}