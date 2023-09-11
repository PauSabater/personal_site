import { Fragment, useRef } from "react"
import styles from "./TopBanner.module.scss"
import { getTodayMonthName } from "../../assets/ts/utils/utils"
import { TopBannerCanvas } from './TopBannerCanvas/TopBannerCanvas'

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

export function TopBanner({ props, mode }: { props: ITopBannerProps, mode: string}) {

    const refsizedTopBanner: React.MutableRefObject<null> = useRef(null)

    return (
        <Fragment>
            <div className={styles.canvasContainer} id="top-banner" data-theme={mode}>
                <TopBannerCanvas mode={mode} />
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