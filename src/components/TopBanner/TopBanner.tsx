import { Fragment, useLayoutEffect, useRef, useState } from "react"
import styles from "./TopBanner.module.scss"
// @ts-ignore -- TODO: solve declaration file from package
import { getTodayMonthName, highPerf, isMobileScreen } from "@pausabater/utils/dist/index.esm.js"
import { hideAllTransitionImages } from "../../assets/ts/utils/utils"
import { TopBannerCanvas } from './TopBannerCanvas/TopBannerCanvas'
import { MobileTopBanner } from "./MobileTopBanner/MobileTopBanner"

export interface ITopBannerProps {
    desktop: {
        pretitle: string,
        lines: string[]
    },
    mobile: {
        pretitle: string,
        lines: string[]
    },
    dateText: string
}

export function TopBanner({ props, mode, perfMode }: { props: ITopBannerProps, mode: string, perfMode: string}) {

    const refsizedTopBanner: React.MutableRefObject<null> = useRef(null)
    const mql = window.matchMedia('(max-width: 768px)')

    const [isMobile, setIsMobile] = useState(isMobileScreen())
    mql.onchange = () => setIsMobile(mql.matches)

    useLayoutEffect(()=> {
        hideAllTransitionImages()
    }, [perfMode])

    return (
        <Fragment>
            <div className={styles.canvasContainer} id="top-banner" data-theme={mode}>
                {isMobile
                    ? <MobileTopBanner mode={mode}/>
                    : perfMode === highPerf ? <TopBannerCanvas mode={mode}/> : <MobileTopBanner mode={mode}
                />}
            </div>
            <div className={styles.container} id={"top-banner-container"}>
                <div ref={refsizedTopBanner} className={styles.sizedTopBanner} />
                <div id="date-banner" className={styles.date}>
                    <div className={styles.dateContainer} >
                        <p id="day-num" className={styles.dayNum}>{"00"}</p>
                        <div className={styles.textContainer}>
                            <p className={styles.text}>{getTodayMonthName()}</p>
                            <p className={styles.text}>Available</p>
                            <p className={styles.text}>for work</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}