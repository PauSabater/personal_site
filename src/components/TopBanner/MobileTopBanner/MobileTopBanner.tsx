import { Fragment, useLayoutEffect, useRef, useState } from "react"
import styles from "./MobileTopBanner.module.scss"
import { setMobileTopBannerAnimations } from "./MobileTopBanner.animations"
import { ellipse, ticks, underline } from "../../../assets/svg/ts/strokes"
import { gridHorizontal, gridMobile } from "./grid"
// @ts-ignore -- TODO: solve declaration file from package
import { dispatchChangeThemeEvent, matchMediaIsVertical } from "@pausabater/utils/dist/index.esm.js"
import gsap from "gsap"


export function MobileTopBanner({ props, mode }: { props?: any, mode: string}) {

    const refContainer = useRef(null)

    const mql = window.matchMedia(matchMediaIsVertical);
    mql.onchange = (e) => setIsVerticalView(mql.matches)

    const [isVerticalView, setIsVerticalView] = useState(mql.matches)

    useLayoutEffect(()=> {
        window.scrollTo(0,0)
        setTimeout(()=> {
            document.querySelector(".page-loader")?.classList.remove("is-loading")
            if (refContainer.current !== null) {
                setTimeout(()=> {
                    gsap.to(document.getElementById("page-overlay"), {
                        opacity: 0,
                        duration: 0.2
                    })
                    setMobileTopBannerAnimations(refContainer.current as unknown as HTMLElement)
                }, 0)
            }
        }, 1500)
    }, [])

    const getAnimatedText = ()=> {
        return (
            <Fragment>
                <p className={`${styles.line} line`}>giving&nbsp;
                    <div id="top-banner-ticks" dangerouslySetInnerHTML={{__html: ticks}}></div>
                    <span
                        className={`${styles.spanAnimated} span-animated`}
                        onClick={()=> dispatchChangeThemeEvent()}
                    >
                    <div id="top-banner-ellipse" dangerouslySetInnerHTML={{__html: ellipse}}></div>
                        shape
                        <span className={styles.shadowText}>
                            shape
                        </span>
                    </span>
                </p>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <div className={`${styles.gridMobile} ${mode === "dark" ? styles.gridDark : ''}`}
                dangerouslySetInnerHTML={{__html: isVerticalView ? gridMobile() : gridHorizontal()}}
            ></div>
            <div ref={refContainer} className={styles.container}>
                <p className={styles.pretitle}>frontend dev
                </p>
                {getAnimatedText()}
                <p className={`${styles.line} line`}>to&nbsp;
                    <span>ideas
                        <div id="top-banner-underline" dangerouslySetInnerHTML={{__html: underline}}></div>
                        {/* <span className={styles.shadowText} data-filled="">
                            ideas
                        </span> */}
                    </span>
                </p>
                <div className={styles.gradientLight} id="top-banner-gradient"></div>
            </div>
        </Fragment>
    )
}