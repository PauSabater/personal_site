import { Fragment, useLayoutEffect, useRef } from "react"
import styles from "./TopBanner.module.scss"
import { getTodayDayNum, getTodayMonthName, isMobileScreen } from "../../assets/ts/utils/utils"
import { setTopBannerAnimations } from "./TopBanner.animations"
import parse from "html-react-parser"
import { ellipse, highlights, underline } from "../../assets/svg/ts/strokes"
import { TopBannerCanvas } from './TopBannerCanvas/TopBannerCanvas'
// import imgStroke from "../../assets/svg/brush_stroke.svg"


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

export function TopBanner({ props }: { props: ITopBannerProps}) {

    const refsizedTopBanner: React.MutableRefObject<null> = useRef(null)
    const refContainerTitleMobile: React.MutableRefObject<null> = useRef(null)

    return (
        <Fragment>
            <div className={styles.canvasContainer} id="top-banner">
                <TopBannerCanvas/>
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