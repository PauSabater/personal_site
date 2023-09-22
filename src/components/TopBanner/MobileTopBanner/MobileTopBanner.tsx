import { Fragment, useLayoutEffect, useRef } from "react"
import styles from "./MobileTopBanner.module.scss"
import { setMobileTopBannerAnimations } from "./MobileTopBanner.animations"
import { ellipse, underline } from "../../../assets/svg/ts/strokes"
import { gridMobile } from "./grid"

export function MobileTopBanner({ props, mode }: { props?: any, mode: string}) {

    const refContainer = useRef(null)

    useLayoutEffect(()=> {
        window.scrollTo(0,0)
        setTimeout(()=> {
            document.querySelector(".page-loader")?.classList.remove("is-loading")
            if (refContainer.current !== null) {
                setMobileTopBannerAnimations(refContainer.current as HTMLElement)
            }
        }, 1500)
    }, [])

    return (
        <Fragment>
            <div className={`${styles.gridMobile} ${mode === "dark" ? styles.gridDark : ''}`} dangerouslySetInnerHTML={{__html: gridMobile()}}></div>
            <div ref={refContainer} className={styles.container}>
                <p className={styles.pretitle}>frontend dev</p>
                <p className={`${styles.line} line`}>giving</p>
                <p className={`${styles.line} line`}>
                    <div id="top-banner-ellipse" dangerouslySetInnerHTML={{__html: ellipse}}></div>
                    <span>shape</span>
                </p>
                <p className={`${styles.line} line`}>to <span>ideas
                    <div id="top-banner-underline" dangerouslySetInnerHTML={{__html: underline}}></div>
                </span>
                </p>
                <div className={styles.gradientLight} id="top-banner-gradient"></div>
            </div>
        </Fragment>
    )
}