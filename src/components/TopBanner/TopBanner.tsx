import { Fragment, useLayoutEffect, useRef } from "react"
import styles from "./TopBanner.module.scss"
import { getTodayDayNum, isMobileScreen } from "../../assets/ts/utils/utils"
import { setTopBannerAnimations } from "./TopBanner.animations"


export function TopBanner({ title, lines }: { title: string, lines: string[]}) {

    const refContainerTitleDesktop: React.MutableRefObject<null> = useRef(null)
    const refContainerTitleMobile: React.MutableRefObject<null> = useRef(null)

    useLayoutEffect(() => {
        setTopBannerAnimations(refContainerTitleDesktop, refContainerTitleMobile)
    }, [])


    return (
        <Fragment>
            <div className={styles.container} >
                <div ref={refContainerTitleDesktop} className={styles.wrappTitle} >
                    <p className={styles.preTitle}>frontend dev</p>
                    <p className={styles.title}>giving light</p>
                    <p className={styles.title}>to ideas</p>
                </div>
                {/* <div ref={refContainerTitleMobile}className={styles.wrapp} >
                    <p className={styles.preTitle}>frontend dev</p>
                    <p className={styles.title}>giving light</p>
                    <p className={styles.title}>to ideas</p>
                </div> */}
                <div id="date-banner" className={styles.date}>
                    <div className={styles.container} >
                        <p className={styles['date__date']}>{getTodayDayNum()}</p>
                        <div className={styles.textContainer}>
                            <p className={styles.text}>Jul</p>
                            <p className={styles.text}>Available</p>
                            <p className={styles.text}>for work</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}