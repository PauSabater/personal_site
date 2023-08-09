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

    const refContainerTitleDesktop: React.MutableRefObject<null> = useRef(null)
    const refContainerTitleMobile: React.MutableRefObject<null> = useRef(null)

    useLayoutEffect(() => {
        setTopBannerAnimations(refContainerTitleDesktop, refContainerTitleMobile)
    }, [])


    return (
        <Fragment>
            <div className={styles.canvasContainer}>
                <TopBannerCanvas/>
                {/* <div className={styles.gradientLight}></div> */}
                {/* <div className={styles.gradientLightSecondary}></div> */}
            </div>
             <div className={styles.container} id={"top-banner-container"}>
             {/* <img src={require("../../assets/svg/brush-stroke.svg")} alt="stoke" /> */}
            <div ref={refContainerTitleDesktop} className={styles.containerTitleDesktop} >
             {/*   <p className={styles.preTitle}>{props.desktop.pretitle}</p>
                { props.desktop.lines.map((line, i)=> {
                    return <p className={styles.title}>{parse(`
                        ${i === 0 ? highlights : ''}
                        ${line.replace("$ellipse$", ellipse).replace("$underline$", underline)}
                    `)}</p>
                })}
            </div> */}
            {/* {parse(ellipse)} */}
            {/* <div ref={refContainerTitleMobile} className={styles.containerTitleMobile} >
                <p className={styles.preTitle}>{props.mobile.pretitle}</p>
                { props.mobile.lines.map((line)=> {
                    return <p className={styles.title}>{parse(line)}</p>
                })}*/}
            </div>
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